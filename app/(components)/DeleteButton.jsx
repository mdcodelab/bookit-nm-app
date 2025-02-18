'use client';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function DeleteButton({ roomId }) {
  const router = useRouter();

  const handleDeleteRoom = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this room?');
    if (confirmed) {
      try {
        const response = await fetch('https://bookit-app-fc55.onrender.com/api/deleteRoom', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ roomId }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success('Room deleted successfully.');
          router.push("/");
          
        } else {
          toast.error(data.message || 'Failed to delete room.');
        }
      } catch (error) {
        console.error('Error deleting room:', error);
        toast.error('An error occurred while deleting the room.');
      }
    }
  };

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full 
            sm:w-auto text-center hover:bg-red-700 flex flex-col items-center justify-center"
      onClick={handleDeleteRoom}
    >
      <FaTrash /> Delete
    </button>
  );
}

export default DeleteButton;
