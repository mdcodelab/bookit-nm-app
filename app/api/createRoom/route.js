import mongoose from 'mongoose';
import Room from "@/models/roomSchema.js";

export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const { name, description, sqft, capacity, location, 
      address, amenities, availability,
      price_per_hour, image, user_id } = await req.json();

    if (!name || !price_per_hour || !image || !user_id) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), { status: 400 });
    }

    const newRoom = new Room({
      name,
      description,
      sqft,
      capacity,
      location,
      address,
      amenities,
      availability,
      price_per_hour,
      image,
      user_id,
    });

    await newRoom.save();

    return new Response(JSON.stringify({ success: true, message: 'Room created successfully' }), { status: 201 });
  } catch (error) {
    console.error('Error creating room:', error);
    return new Response(JSON.stringify({ success: false, error: 'Server error' }), { status: 500 });
  }
}
