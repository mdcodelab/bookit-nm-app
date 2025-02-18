import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export async function POST(request) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    // Obține datele din request
    const { email, password } = await request.json();

    // Validări de bază
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // Caută userul în baza de date
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Compară parola primită cu parola hash-uită din baza de date
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Creează un token JWT
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Creează răspunsul și setează cookie-ul
    const response = NextResponse.json(
      { 
        success: "User logged in successfully.",
        user: { id: user._id.toString(), email: user.email }  // Adăugăm userId aici
      },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 zile
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error in login API:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
