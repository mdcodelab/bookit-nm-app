"use server";

import axios from "axios";

export const getAllRooms = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/');
    return response.data;
  } catch (error) {
    console.error("Eroare la obținerea camerelor:", error);
    return []; 
  }
};
