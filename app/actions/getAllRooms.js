"use server";

import axios from "axios";

export const getAllRooms = async () => {
  try {
    const response = await axios.get('https://bookit-app-fc55.onrender.com/api/');
    return response.data;
  } catch (error) {
    console.error("Eroare la obținerea camerelor:", error);
    return []; 
  }
};
