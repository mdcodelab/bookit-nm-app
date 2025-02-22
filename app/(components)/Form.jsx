"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { checkBooking } from "../actions/checkBooking";
import { useRouter } from 'next/navigation';


function Form({ room, bookedDates}) {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const router=useRouter();

  useEffect(() => {
    // Reset dates when room or bookedDates change
    setCheckInDate(null);
    setCheckOutDate(null);
  }, [room, bookedDates]);

  const isDateAvailable = (date) => {
    return !bookedDates?.some(
      (booked) =>
        (new Date(booked.check_in).toDateString() <= date.toDateString() &&
          new Date(booked.check_out).toDateString() >= date.toDateString())
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!room?._id) {
      toast.error("Room ID is missing.");
      return;
    }
  
    if (!checkInDate || !checkOutDate) {
      toast.error("Please select both check-in and check-out dates.");
      return;
    }
  
    if (!isDateAvailable(checkInDate) || !isDateAvailable(checkOutDate)) {
      toast.error("Selected dates are not available.");
      return;
    }
  
    try {
      // Check if the room is already booked for the selected dates
      const existingBookings = await checkBooking(room._id);
  
      // Compare the selected dates with existing bookings
      const isRoomBooked = existingBookings.some(
        (booking) =>
          (new Date(booking.check_in).toDateString() <= checkInDate.toDateString() &&
            new Date(booking.check_out).toDateString() >= checkOutDate.toDateString())
      );
  
      if (isRoomBooked) {
        toast.error("The room is already booked for the selected dates.");
        return;
      }
  
      const bookingData = {
        user_id: userId,
        room_id: room._id,
        check_in: checkInDate,
        check_out: checkOutDate,
      };
  
      const response = await fetch("https://bookit-app-fc55.onrender.com/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success("Booking created successfully!");
        setCheckInDate(null);
        setCheckOutDate(null);
        setCheckInTime(null);
        setCheckOutTime(null);
        router.push("/bookings");
      } else {
        toast.error(data.error || "Failed to create booking.");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("An error occurred while booking the room.");
    }
  };
  

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <input type="hidden" name="room_id" value={room._id} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="check_in_date"
            className="block text-sm font-medium text-gray-700"
          >
            Check-In Date
          </label>
          <DatePicker
            selected={checkInDate}
            onChange={(date) => setCheckInDate(date)}
            minDate={new Date()}
            filterDate={isDateAvailable}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="check_in_time"
            className="block text-sm font-medium text-gray-700"
          >
            Check-In Time
          </label>
          <input
            type="time"
            id="check_in_time"
            name="check_in_time"
            value={checkInTime}
            onChange={(e) => setCheckInTime(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="check_out_date"
            className="block text-sm font-medium text-gray-700"
          >
            Check-Out Date
          </label>
          <DatePicker
            selected={checkOutDate}
            onChange={(date) => setCheckOutDate(date)}
            minDate={checkInDate ? new Date(checkInDate) : new Date()}
            filterDate={isDateAvailable}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="check_out_time"
            className="block text-sm font-medium text-gray-700"
          >
            Check-Out Time
          </label>
          <input
            type="time"
            id="check_out_time"
            name="check_out_time"
            value={checkOutTime}
            onChange={(e) => setCheckOutTime(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
        >
          Book Room
        </button>
      </div>
    </form>
  );
}

export default Form;