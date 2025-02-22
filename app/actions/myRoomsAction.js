"use server";
import mongoose from "mongoose";
import Room from "@/models/roomSchema";

export const getMyRooms = async (userId) => {
  await mongoose.connect(process.env.MONGO_URL);

  // 🔥 Găsește camerele user-ului și convertim _id în string
  const myRooms = await Room.find({ user_id: userId }).lean();

  return myRooms.map((room) => ({
    ...room,
    _id: room._id.toString(),
    user_id: room.user_id.toString()
  }))
};

