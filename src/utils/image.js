// imageApi.js
import axios from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export async function fetchImageURL(imageId) {
  try {
    const imageResponse = await axios.get(`${apiBaseUrl}/media/${imageId}`);
    return imageResponse.data.source_url; // Assuming 'source_url' contains the image URL
  } catch (error) {
    console.error('Error fetching image URL:', error);
    return null;
  }
}
