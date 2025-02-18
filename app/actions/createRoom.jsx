"use server";
import Room from "@/models/roomSchema.js";
import mongoose from "mongoose";

export async function createRoom(prevState, formData, userId) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const newRoom = await Room.create({
      name: formData.get("name"),
      description: formData.get("description"),
      sqft: formData.get("sqft"),
      capacity: formData.get("capacity"),
      price_per_hour: formData.get("price_per_hour"),
      address: formData.get("address"),
      location: formData.get("location"),
      availability: formData.get("availability"),
      amenities: formData.get("amenities"),
      image: formData.get("image") || "",
      user_id: userId
    });

    return { success: true, room: newRoom };
  } catch (error) {
    console.error("Error creating room:", error);
    return { error: "Failed to create room." };
  }
}
