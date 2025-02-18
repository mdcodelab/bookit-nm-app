"use client";
import React from "react";
import Link from "next/link";
import { toast } from "react-toastify";

function BookedRoomCard({ booking, refreshBookings }) {  
  const handleCancelBooking = async (bookingId) => {
    if (!bookingId) {
      toast.error("Booking ID is missing!");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete this room?");
    if (confirmed) {
      try {
        const response = await fetch("https://bookit-app-fc55.onrender.com/api/cancelBooking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookingId }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("Booking canceled successfully.");
          refreshBookings(); // 🔥 Actualizează lista de booking-uri!
        } else {
          toast.error(data.message || "Failed to cancel booking.");
        }
      } catch (error) {
        console.error("Error cancelling booking", error);
        toast.error("An error occurred while cancelling booking.");
      }
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div>
        <h4 className="text-lg font-semibold">Room ID: {booking.room_id}</h4>
        <p className="text-sm text-gray-600">
          <strong>Check In: </strong>{booking.check_in}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Check Out: </strong>{booking.check_out}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0">
        <Link
          href={`/rooms/${booking.room_id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-blue-700"
        >
          View Room
        </Link>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700"
          onClick={() => handleCancelBooking(booking._id)}
        >
          Cancel Booking
        </button>
      </div>
    </div>
  );
}

export default BookedRoomCard;
