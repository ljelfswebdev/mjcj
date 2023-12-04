
import axios from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export const fetchServices = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/service`, {
      params: {
        _fields: 'id,title,acf,skill', // Adjust fields as needed
      },
    });

    const services = response.data;

    return services.map(service => ({
      ...service,
      imageURL: service.acf.slide_image, // Assuming 'slide_image' is the ACF field for the image URL
    }));
  } catch (error) {
    console.error('Error fetching Services:', error);
    throw error;
  }
};


export const fetchServiceDetail = async (id) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/service/${id}`, {
      params: {
        _fields: 'id,title,acf', 
      },
    });

    const service = response.data;

    // Fetch the image URL directly from ACF field assuming 'service_image' holds the image URL
    const imageURL = service.acf.service_image; // Assuming 'service_image' holds the image URL

    return {
      ...service,
      imageURL: imageURL,
    };
  } catch (error) {
    console.error('Error fetching service details:', error);
    throw error;
  }
};