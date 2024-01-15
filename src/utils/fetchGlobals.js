"use client";

import axios from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

export const fetchGlobalsData = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/wp-json/acf/v3/options/options`);
    if (response.status !== 200) {
      throw new Error('Failed to fetch data');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching globals data:', error);
    return null;
  }
};
