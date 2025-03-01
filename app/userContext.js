'use client';
import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const[loading, setLoading]=useState(true);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const response = await fetch('https://bookit-app-fc55.onrender.com/api/getUser', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setLoading(false);
          setUserId(data.userId);
        } else {
          setUserId('');
          setUserId(false);
        }
      } catch (error) {
        setUserId('');
        setUserId(false);
      }
    };
    getUserId();
    getUserId();
  }, []);

  const signOut = async () => {
    try {
      const response = await fetch('https://bookit-app-fc55.onrender.com/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        setLoading(false);
        setUserId('');
        return { success: true, message: 'Signed out successfully.' };
      } else {
        setLoading(false);
        throw new Error('Logout failed.');
      }
    } catch (error) {
      console.error('Logout failed', error);
      setLoading(false);
      return { success: false, message: 'An error occurred during logout.' };
    }
  };

  console.log(userId);

  return (
    <AuthContext.Provider value={{ userId, signOut, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
export const useAuthContext = () => React.useContext(AuthContext);
