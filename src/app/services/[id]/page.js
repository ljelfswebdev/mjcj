'use client';

// pages/services/[id].js
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'
import { fetchServiceDetail } from '../../../utils/fetchServices'; // Create a function to fetch the detail of a specific service
import { useGlobalsContext } from '../../../utils/fetchGlobals';
const ServiceDetail = () => {
  const globalsData = useGlobalsContext();

    const pathname = usePathname();
    const parts = pathname.split('/');
    const id = parts[parts.length - 1];

    const [serviceDetail, setServiceDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
          fetchServiceDetail(id)
            .then((serviceWithImageUrls) => {
              setServiceDetail(serviceWithImageUrls);
              setIsLoading(false);
            })
            .catch((error) => {
              console.log('Error fetching service details', error);
              setIsLoading(false);
            });
        }
      }, [id]);

      if (isLoading || !globalsData) {
        return (
          <div className="loading">
            <img src="/loading.gif" alt="Loading..." />
          </div>
        );
      }

  return (
    <div>
      {serviceDetail ? (
        <div>
          <h1>{serviceDetail.title.rendered}</h1>
          <p>text: {serviceDetail.acf.service_info}</p>
          {serviceDetail.imageURL && (
            <img src={serviceDetail.imageURL} alt={serviceDetail.title.rendered} />
            )}
        </div>
      ) : (
        <div className="loading">
          <img src="/loading.gif" alt="Loading..." />
        </div>
      )}
    </div>
  );
};

export default ServiceDetail;
