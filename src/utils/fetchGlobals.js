"use client";

// GlobalsContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const GlobalsContext = createContext();

export const useGlobalsContext = () => {
  return useContext(GlobalsContext);
};

export const GlobalsProvider = ({ children }) => {
  const [globalsData, setGlobalsData] = useState(null);

  useEffect(() => {
    const fetchGlobalsData = async () => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
        const response = await axios.get(`${apiBaseUrl}/globals`); // Adjust the endpoint as needed
        setGlobalsData(response.data[0]); // Assuming you want the first entry
      } catch (error) {
        console.error('Error fetching globals data:', error);
      }
    };

    fetchGlobalsData();
  }, []);

  return (
    <GlobalsContext.Provider value={globalsData}>
      {children}
    </GlobalsContext.Provider>
  );
};
