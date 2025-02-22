"use client";
import React from "react";
import { useState, useEffect} from "react";
import axios from "axios";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  //STATE VALUES
  const [userId, setUserId]=useState("");

  //FUNCTIONS

  useEffect(() => {
    const getUserId = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user", {
          withCredentials: true
        });
        setUserId(response.data.userId || "");
      } catch (error) {
        setUserId(""); // Dacă API-ul dă eroare, resetăm userId
      }
    };
    getUserId();
  }, []);
  
     

      console.log(userId);

  return (
    <AuthContext.Provider
      value={{
        userId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
export const useAuthContext = () => {
  return React.useContext(AuthContext);
};