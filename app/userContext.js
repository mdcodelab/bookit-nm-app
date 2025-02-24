'use client';
import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const getUserId = async () => {
      try {
        const response = await fetch('/api/user', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setUserId(data.userId || '');
        } else {
          setUserId('');
        }
      } catch (error) {
        setUserId('');
      }
    };
    getUserId();
  }, []);

  const signOut = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        setUserId('');
        return { success: true, message: 'Signed out successfully.' };
      }
    } catch (error) {
      console.error('Logout failed', error);
      return { success: false, message: 'An error occurred during logout.' };
    }
  };

  return (
    <AuthContext.Provider value={{ userId, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
export const useAuthContext = () => React.useContext(AuthContext);
