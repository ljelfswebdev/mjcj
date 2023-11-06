import axios from 'axios';

export const fetchPageData = async (slug) => {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
    const response = await axios.get(`${apiBaseUrl}/pages?slug=${slug}`);
    return response.data[0];
  } catch (error) {
    console.error('Error fetching page data:', error);
    throw error;
  }
};