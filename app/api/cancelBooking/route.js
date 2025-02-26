import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Booking from "@/models/bookingSchema";

export async function POST (req) {
    try {
            const { bookingId } = await req.json(); // Obține roomId din request body
            
            if (!bookingId) {
                return Response.json({ success: false, message: 'Booking ID is required' }, { status: 400 });
            }
    
            await mongoose.connect(process.env.MONGO_URL);
            const result = await Booking.findByIdAndDelete(bookingId);
    
            if (result) {
                return Response.json({ success: true, message: 'Booking canceled successfully' }, { status: 200 });
            } else {
                return Response.json({ success: false, message: 'Booking not found' }, { status: 404 });
            }
        } catch (error) {
            console.error('Error cancelling booking', error);
            return Response.json({ success: false, message: 'Internal server error' }, { status: 500 });
        }
    }
    


