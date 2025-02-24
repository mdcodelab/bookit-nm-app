"use server";
import mongoose from "mongoose";
import Room from "@/models/roomSchema";

// import axios from "axios";

// export const getAllRooms = async () => {
//   try {
//     const response = await axios.get('http://localhost:3000/api/');
//     return response.data;
//   } catch (error) {
//     console.error("Eroare la obținerea camerelor:", error);
//     return []; 
//   }
// };

export async function getAllRooms () {
  await mongoose.connect(process.env.MONGO_URL);
  const rooms = await Room.find();
  return JSON.parse(JSON.stringify(rooms));
}
