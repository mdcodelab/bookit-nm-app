import React from 'react';
import Heading from '../(components)/Heading';
import BookedRoomCard from '../(components)/BookedRoomCard';
import axios from 'axios';

async function BookingsPage() {
  const response = await axios.get('http://localhost:3000/api/getBookings');
  const bookings = response.data;
  console.log('Bookings', bookings);

  return (
    <div className="min-h-[50vh]">
      <Heading title="My Bookings" />
      <div>
        {bookings.length > 0 ? (
          <div>
            {bookings.map((booking, index) => {
              return <BookedRoomCard key={index} booking={booking} />;
            })}
          </div>
        ) : (
          <p className="text-center mt-4">You have no bookings yet.</p>
        )}
      </div>
    </div>
  );
}

export default BookingsPage;
