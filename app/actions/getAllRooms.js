"use server";
import mongoose from "mongoose";
import Room from "@/models/roomSchema";

export const getAllRooms = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    const rooms = await Room.find({});
    return JSON.parse(JSON.stringify(rooms));
}