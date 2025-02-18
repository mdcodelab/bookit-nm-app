"use client";
import React from "react";
import { useState} from "react";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  //STATE VALUES
  const [isAuthenticated, setIsAuthenticated]=useState(false);
  const [userId, setUserId]=useState(null);


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userId,
        setUserId
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