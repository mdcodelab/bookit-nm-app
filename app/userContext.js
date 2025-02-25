'use client';
import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const[loading, setLoading]=useState(true);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/getUser', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setUserId(data.userId);
        } else {
          setUserId('');
        }
      } catch (error) {
        setUserId('');
      }
    };
    getUserId();
  }, [userId]);

  const signOut = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        setLoading(false);
        setUserId('');
        return { success: true, message: 'Signed out successfully.' };
      } else {
        throw new Error('Logout failed.');
      }
    } catch (error) {
      console.error('Logout failed', error);
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
