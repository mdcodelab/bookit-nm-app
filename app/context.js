"use client";
import React, { useState, useEffect } from "react";
import { getUser } from "./actions/userActions";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  // STATE VALUES
  const [userId, setUserId] = useState(null);

  // FUNCTIONS
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser();
        if (!userData?._id) {
          throw new Error("User not found");
        }
        setUserId(userData._id.toString());
      } catch (error) {
        console.error(error.message);
      }
    };

    if (!userId) {
      fetchUserData();
    }
  }, []); 

  return (
    <AuthContext.Provider value={{ userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
export const useAuthContext = () => React.useContext(AuthContext);
