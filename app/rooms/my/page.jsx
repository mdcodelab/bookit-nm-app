'use client';
import React, { useState, useEffect } from 'react';
import Heading from '@/app/(components)/Heading';
import MyRoomCard from '@/app/(components)/MyRoomCard';
import { useAuthContext } from '@/context/authContext';

function MyRoomsPage() {
  const { userId } = useAuthContext(); 
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      if (!userId) {
        console.log("UserId nu este disponibil încă");
        return;
      }

      try {
        const response = await fetch('https://bookit-app-fc55.onrender.com/api', {
          method: 'GET',
        });
      
        const result = await response.json();

        console.log("UserId din context:", userId);
        console.log("Rooms returnate de API:", result);

        const myRooms = result.filter(
          (room) => room.user_id.toString() === userId.toString()
        );
        console.log("Rooms filtrate:", myRooms);
        setRooms(myRooms);
      } catch (err) {
        setError('Failed to fetch rooms');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [userId]);

  if (loading) {
    return <div className="min-h-[50vh]"><p>Loading...</p></div>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (rooms.length === 0) {
    return <p>You have no rooms listed.</p>;
  }

  return (
    <div className="min-h-[50vh]">
      <Heading title="My Rooms" />
      {rooms.map((room, index) => (
        <MyRoomCard key={index} room={room} />
      ))}
    </div>
  );
}

export default MyRoomsPage;
