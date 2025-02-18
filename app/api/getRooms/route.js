// app/api/rooms/route.js
import mongoose from 'mongoose';
import Room from '@/models/roomSchema.js';

export async function GET(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('user_id');

    if (!userId) {
      return new Response(JSON.stringify({ success: false, error: 'Missing user_id parameter' }), { status: 400 });
    }

    const rooms = await Room.find({ user_id: userId });

    return new Response(JSON.stringify({ success: true, rooms }), { status: 200 });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return new Response(JSON.stringify({ success: false, error: 'Server error' }), { status: 500 });
  }
}
