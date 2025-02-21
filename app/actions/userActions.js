"use server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "@/models/userSchema";


//REGISTER
export const register = async (name, email, password, rePassword) => {
  await mongoose.connect(process.env.MONGO_URL);
  const existingUser = await User.findOne({email});

  if (existingUser) {
    throw new Error("User with this email already exists.");
  }

  if (password !== rePassword) {
    throw new Error("Passwords must match");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
name, email, password: hashedPassword 
  });

  redirect("/login");
}



//LOGIN
export const login = async (email, password) => {
  await mongoose.connect(process.env.MONGO_URL);
const existingUser = await User.findOne({email});

console.log(existingUser);
if(!existingUser) {
throw new Error("Invalid email or password.");
}

const isPasswordValid = await bcrypt.compare(password, existingUser.password);
if(!isPasswordValid) {
  throw new Error("Invalid password.");
}

// generate a JWT token
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";
  const token = jwt.sign({ userId: existingUser._id, email: existingUser.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

// store the token in a cookie
  cookies().set("auth_token", token, {
    httpOnly: true, // Cookie-ul este accesibil doar serverului
    secure: process.env.NODE_ENV === "production", // Cookie-ul este securizat doar în producție
    sameSite: "strict", // Cookie-ul este accesibil doar pe același site
    path: "/",
    maxAge: 3600, // Cookie-ul expiră după 1 oră
  });

  if(!token) {
    throw new Error("No auth token");
  }

  return { success: "Login successful!", user: { _id: toString(existingUser._id), email: existingUser.email } };

  //redirect("/");
}


//GET USER FROM TOKEN (for profile page - protected & navbar)
export async function getUserFromToken(authToken) {
  if (!authToken) {
    throw new Error("No token found");
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET || "secret_key";
    // Decodifică tokenul JWT pentru a obține informațiile utilizatorului
    const decodedToken = jwt.verify(authToken, JWT_SECRET);

    // Caută utilizatorul în baza de date după ID-ul din token
    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error retrieving user from token:", error);
    throw new Error("Failed to retrieve user");
  }
}



//SIGN OUT
export async function signOut() {
  cookies().delete("auth_token");
}



//change password
export async function changePassword (email, newPassword, retypePassword) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new Error("Email not found.");
  }

  if (!user.emailVerified) {
    throw new Error("You must verify your email first.");
  }

  if (newPassword !== retypePassword) {
    throw new Error("Passwords must match.");
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      hashedPassword: hashedNewPassword,
    },
  });

  //generate jwt token
  const JWT_SECRET = process.env.JWT_SECRET || "secret_key";
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  // store the token in a cookie
  cookies().set("auth_token", token, {
    httpOnly: true, // Cookie-ul este accesibil doar serverului
    secure: process.env.NODE_ENV === "production", // Cookie-ul este securizat doar în producție
    sameSite: "strict", // Cookie-ul este accesibil doar pe același site
    path: "/",
    maxAge: 3600, // Cookie-ul expiră după 1 oră
  });

  redirect("/profile");
}
