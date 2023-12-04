'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'
import { fetchServiceDetail } from '../../../utils/fetchServices';

const ServiceDetail = () => {

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

  if (isLoading || !globalsData || !serviceDetail) {
    return (
      <div className="loading">
        <img src="/loading.gif" alt="Loading..." />
      </div>
    );
  }

  return (
    <div>
      <h1>{serviceDetail.title.rendered}</h1>
      <p>text: {serviceDetail.acf.slide_text}</p>
      {serviceDetail.imageURL && (
        <img src={serviceDetail.imageURL} alt={serviceDetail.title.rendered} />
      )}
    </div>
  );
};

export default ServiceDetail;
