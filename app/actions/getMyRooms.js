"use server";
import mongoose from "mongoose";
import Room from "@/models/roomSchema";

export const getMyRooms = async (userId) => {
    await mongoose.connect(process.env.MONGO_URL);
    const rooms = await Room.find({ user_id: userId });
    return JSON.parse(JSON.stringify(rooms));
}