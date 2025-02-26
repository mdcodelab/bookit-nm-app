import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Room from "@/models/roomSchema";

export async function POST(req) {
    try {
        const { roomId } = await req.json(); // Obține roomId din request body
        
        if (!roomId) {
            return NextResponse.json({ success: false, message: 'Room ID is required' }, { status: 400 });
        }

        await mongoose.connect(process.env.MONGO_URL);
        const result = await Room.findByIdAndDelete(roomId);

        if (result) {
            return NextResponse.json({ success: true, message: 'Room deleted successfully' }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, message: 'Room not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error deleting room:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}