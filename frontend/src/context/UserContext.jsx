import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetching the logged-in user info from localStorage
    const fetchUserFromStorage = () => {
      const userData = localStorage.getItem('chat-user'); // Getting user info from local storage
      if (userData) {
        const userObject = JSON.parse(userData);
        setUser(userObject);
      }
    };

    fetchUserFromStorage();
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};
