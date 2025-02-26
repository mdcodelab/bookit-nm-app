import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Booking from "@/models/bookingSchema";

export async function GET() {
    await mongoose.connect(process.env.MONGO_URL);
    const bookings = await Booking.find({});
    return NextResponse.json(bookings);
}