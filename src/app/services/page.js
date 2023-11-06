// Your Next.js page file
"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchPageData } from '../../utils/fetchPageData';
import { fetchServices } from '../../utils/fetchServices';
import { useGlobalsContext } from '../../utils/fetchGlobals';

const ServicesPage = () => {
  const [pageData, setPageData] = useState(null);
  const globalsData = useGlobalsContext();

  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const slug = 'services';
    fetchPageData(slug)
      .then((data) => {
        setPageData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching page data');
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchServices()
      .then((servicesWithImages) => {
        setServices(servicesWithImages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching services');
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <img src="/loading.gif" alt="Loading..." />
      </div>
    );
  }

  return (
    <div>
      <h1>{pageData.acf.page_title}</h1>
      <p dangerouslySetInnerHTML={{ __html: pageData.acf.page_subtext }}></p>
      {services.map((service) => (
        <Link href={`/services/${service.id}`} key={service.id}>
          <p>{service.title.rendered}</p>
          <p>text: {service.acf.service_info}</p>

          {/* Display the image URL */}
          {service.imageURL && (
            <img src={service.imageURL} alt={service.title.rendered} />
          )}
        </Link>
      ))}
    </div>
  );
};

export default ServicesPage;
