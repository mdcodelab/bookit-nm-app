"use client";
import React, { useState, useEffect } from "react";
import Heading from "../(components)/Heading";
import BookedRoomCard from "../(components)/BookedRoomCard";
import axios from "axios";

function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/getBookings");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-[50vh]">
      <Heading title="My Bookings" />
      <div>
        {bookings.length > 0 ? (
          <div>
            {bookings.map((booking) => (
              <BookedRoomCard key={booking._id} booking={booking} refreshBookings={fetchBookings} />
            ))}
          </div>
        ) : (
          <p className="text-center mt-4">You have no bookings yet.</p>
        )}
      </div>
    </div>
  );
}

export default BookingsPage;
