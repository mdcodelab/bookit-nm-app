import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Room from "@/models/roomSchema.js";

//GET ALL ROOMS
export async function GET() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const rooms = await Room.find();
    return NextResponse.json(rooms, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Eroare la preluarea camerelor" }, { status: 500 });
  }
}

