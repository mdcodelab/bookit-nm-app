import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  room_id: { type: String, required: true },
  check_in: { type: Date, required: true },
  check_out: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

