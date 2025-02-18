// REGISTER
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();
export async function POST(request) {
    try {
      await mongoose.connect(process.env.MONGO_URL);
  
      // Obține datele din request
      const { name, email, password, rePassword } = await request.json();
  
      // Validări de bază
      if (!name || !email || !password || !rePassword) {
        return NextResponse.json(
          { error: "All fields are required." },
          { status: 400 }
        );
      }
      if (password !== rePassword) {
        return NextResponse.json(
          { error: "Passwords do not match." },
          { status: 400 }
        );
      }
  
      // Verifică dacă email-ul există deja
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { error: "Email already exists." },
          { status: 400 }
        );
      }
  
      // Hash-uim parola
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Creăm noul user
      const user = await User.create({ name, email, password: hashedPassword });
  
      // Creăm un token JWT
      const token = jwt.sign(
        { id: user._id.toString(), email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
  
      // Creăm răspunsul și setăm cookie-ul
      const response = NextResponse.json(
        { success: "User created successfully." },
        { status: 201 }
      );
      response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 zile în secunde
        path: "/",
      });
  
      return response;
    } catch (error) {
      console.error("Error in register API:", error);
      return NextResponse.json(
        { error: "Internal server error." },
        { status: 500 }
      );
    }
  }
  
  