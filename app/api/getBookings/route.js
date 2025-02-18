import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Booking from "@/models/bookingSchema.js";

//GET ALL BOOKINGS
export async function GET() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const bookings = await Booking.find(); // Fetch the bookings from the database
    return NextResponse.json(bookings, { status: 200 }); // Return bookings, not rooms
  } catch (error) {
    return NextResponse.json({ error: "Error in retrieving data" }, { status: 500 });
  }
}
