"use client";
import React from "react";
import { useState, useEffect} from "react";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  //STATE VALUES
  const [isAuthenticated, setIsAuthenticated]=useState(false);
  const [userId, setUserId]=useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(()=> {
  etch("https://bookit-app-fc55.onrender.com/api/auth/", { credentials: "include" })
  .then((res) => res.json())
  .then((data) => {
    if (data.authenticated) {
      setUser(data.user);
      isAuthenticated(true);
    }
  })
  .finally(() => setLoading(false));
}, []);


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