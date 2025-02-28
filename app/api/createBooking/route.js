import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Booking from "@/models/bookingSchema.js";

export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const body = await req.json();
    const { user_id, room_id, check_in, check_out } = body;

    if (!user_id || !room_id || !check_in || !check_out) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Convertire corectă a datelor
    const booking = new Booking({
      user_id: new mongoose.Types.ObjectId(user_id), 
      room_id: new mongoose.Types.ObjectId(room_id),
      check_in: new Date(check_in),
      check_out: new Date(check_out),
    });

    await booking.save();

    return NextResponse.json({ message: "Booking created successfully", booking }, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
