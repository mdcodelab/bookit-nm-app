import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({

  name: { type: String, required: true },
  description: { type: String },
  sqft: { type: Number },
  capacity: { type: Number },
  location: { type: String },
  address: { type: String },
  amenities: { type: [String] },
  availability: { type: String },
  price_per_hour: { type: Number },
  image: { type: String },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });


export default mongoose.models.Room || mongoose.model("Room", RoomSchema);
