import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Booking from "@/models/bookingSchema";

export async function POST() {
    await mongoose.connect(process.env.MONGO_URL);

}