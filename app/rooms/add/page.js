"use client";
import { useState, useEffect } from "react";
import Heading from "@/app/(components)/Heading";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/userContext";

function AddRoomsPage() {
  const router = useRouter();
  const { userId } = useAuthContext();
  const [state, setState] = useState({ success: false, error: null });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sqft, setSqft] = useState('');
  const [capacity, setCapacity] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [amenities, setAmenities] = useState('');
  const [availability, setAvailability] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');

  useEffect(() => {
    if (state.success) {
      toast.success("Room created successfully.");
      router.push("/");
    }
    if (state.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      description,
      sqft,
      capacity,
      location,
      address,
      amenities,
      availability,
      price_per_hour: pricePerHour,
      image: imageBase64,
      user_id: userId,
    };

    try {
      const response = await fetch("https://bookit-rouge.vercel.app/api/createRoom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(data);
      setState(result);
    } catch (error) {
      setState({ success: false, error: "Failed to create room" });
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full">
      <Heading title="Add a Room" />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Room Name</label>
          <input type="text" className="border rounded w-full py-2 px-3" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea className="border rounded w-full h-24 py-2 px-3" required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Square Feet</label>
          <input type="number" className="border rounded w-full py-2 px-3" required value={sqft} onChange={(e) => setSqft(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Capacity</label>
          <input type="number" className="border rounded w-full py-2 px-3" required value={capacity} onChange={(e) => setCapacity(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Price Per Hour</label>
          <input type="number" className="border rounded w-full py-2 px-3" required value={pricePerHour} onChange={(e) => setPricePerHour(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Address</label>
          <input type="text" className="border rounded w-full py-2 px-3" required value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Location</label>
          <input type="text" className="border rounded w-full py-2 px-3" required value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Availability</label>
          <input type="text" className="border rounded w-full py-2 px-3" required value={availability} onChange={(e) => setAvailability(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Amenities</label>
          <input type="text" className="border rounded w-full py-2 px-3" required value={amenities} onChange={(e) => setAmenities(e.target.value)} />
        </div>
        <div className="mb-8">
          <label className="block text-gray-700 font-bold mb-2">Image</label>
          <input type="file" className="border rounded w-full py-2 px-3" onChange={handleChangeImage} />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover" />}
        </div>
        <div className="flex flex-col gap-5">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
        </div>
      </form>
    </div>
  );
}

export default AddRoomsPage;
