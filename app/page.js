'use client'; 
import React, { useState, useEffect } from 'react';
import { getAllRooms } from "./actions/getAllRooms.js";
//import { rooms } from '@/data/rooms.js';
import RoomCard from './(components)/RoomCard.jsx';
import Heading from './(components)/Heading.jsx';
import Accordeon from './(components)/Accordeon.jsx';

function Page() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsData = await getAllRooms();
        setRooms(roomsData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return <div classname="min-h-[50vh]">Loading...</div>;
  }

  return (
    <div className="h-full height min-h-[50vh]">
      <h1 className="text-3xl my-10 text-center font-bold">Rooms for Booking</h1>
      <div className="flex items-center justify-between accordeon-container">
        <p>Explore our wide range of rooms available for booking, perfect for meetings, conferences, 
        or any event. Each room is equipped with modern amenities to ensure comfort 
        and productivity. Browse through the options and book the ideal space for your next gathering!</p>
        <Accordeon></Accordeon>
      </div>
      <Heading title="Available rooms"></Heading>
      {
        rooms.length > 0 
        ? rooms.map((room) => (
            <div key={room._id}>
              <RoomCard room={room}></RoomCard>
            </div>
          ))
        : <div>No rooms available at the moment.</div>
      }
    </div>
  );
}

export default Page;
