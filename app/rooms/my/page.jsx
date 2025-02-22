import React from 'react';
import Heading from '@/app/(components)/Heading';
import MyRoomCard from '@/app/(components)/MyRoomCard';
import { getUser } from '@/app/actions/userActions';
import { getMyRooms } from '@/app/actions/roomsActions';

async function MyRoomsPage() {
  //get user id
  const user = await getUser();
  const userId = user._id.toString();
  console.log(userId);
  //gey my rooms
  const rooms = await getMyRooms(userId);


  if (rooms.length === 0) {
    return <div className="min-h-[50vh]">You have no rooms listed.</div>;
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
