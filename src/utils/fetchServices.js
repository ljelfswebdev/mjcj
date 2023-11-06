
import axios from 'axios';
import { fetchImageURL } from './image';

const apiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export const fetchServices = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/service`, {
      params: {
        _fields: 'id,title,acf', 
      },
    });
    const servicesWithImageUrls = await Promise.all(
      response.data.map(async (service) => ({
        ...service,
        imageURL: await fetchImageURL(service.acf.slide_image),
      }))
    );

    return servicesWithImageUrls;
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
    const imageURL = await fetchImageURL(service.acf.service_image);
    service.imageURL = imageURL;
    return service;
  } catch (error) {
    console.error('Error fetching service details:', error);
    throw error;
  }
};
