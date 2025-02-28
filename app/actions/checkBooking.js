"use server";
import mongoose from "mongoose";
import Booking from "@/models/bookingSchema.js";

export async function checkBooking(roomId) {
  if (!roomId) {
    throw new Error("Room ID is required");
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    const bookings = await Booking.find({ room_id: roomId });
    return JSON.parse(JSON.stringify(bookings));
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    throw new Error("Failed to fetch bookings");
  }
}
