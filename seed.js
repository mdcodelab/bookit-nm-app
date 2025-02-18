import mongoose from "mongoose";
import Room from "./models/roomSchema.js";
import User from "./models/userSchema.js";
import {rooms} from "./data/rooms.js";
import dotenv from "dotenv";
dotenv.config();

console.log("🔍 MONGO_URL =", process.env.MONGO_URL);


const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("📡 Conectat la MongoDB...");

    // ⚠️ Opțional: Șterge datele existente
    await Room.deleteMany();
    console.log("Database connected");

    // Obține utilizatorii existenți pentru referințele `user`
    const users = await User.find();
    if (users.length === 0) {
      console.log("⚠️ Nu există utilizatori în baza de date. Adaugă mai întâi utilizatori!");
      return;
    }

    // Transformă datele pentru a avea `_id` în loc de `user_id`
    const roomsToInsert = rooms.map((room) => ({
      ...room,
      user: users.find((u) => u._id.toString() === room.user_id) || users[0], // Asociază un utilizator valid
      amenities: room.amenities.split(", ").map((a) => a.trim()), // Convertim string în array
    }));

    await Room.insertMany(roomsToInsert);
    console.log("✅ Datele au fost inserate cu succes!");

    process.exit(); // Oprire după finalizare
  } catch (error) {
    console.error("❌ Eroare la popularea bazei de date:", error);
    process.exit(1);
  }
};

seedDatabase();

//node seed.js
