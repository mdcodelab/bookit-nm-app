import React from 'react';
import { getAllRooms } from "./actions/getAllRooms.js";
//import { rooms } from '@/data/rooms.js';
import RoomCard from './(components)/RoomCard.jsx';
import Heading from './(components)/Heading.jsx';
import { Accordeon } from './(components)/Accordeon.jsx';

async function Page() {
  const rooms = await getAllRooms();

  

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
