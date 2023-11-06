import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Link from 'next/link';
import { fetchServices } from '../utils/fetchServices';
import { useGlobalsContext } from '../utils/fetchGlobals';

const ServiceSwiper = () => {
    const globalsData = useGlobalsContext();
    const [services, setServices] = useState([]); // State to store fetched services

    useEffect(() => {
      fetchServices()
        .then((servicesWithImages) => {
          setServices(servicesWithImages);
        })
        .catch((error) => {
          console.log('Error fetching services')
        });
    }, []);
    return ( 
        <section className="service-swiper">
        <div className="container">
          <div className="service-swiper-content">
            <div className="service-swiper-content-title">
              <span></span>{globalsData.acf.service_swiper_title}<span></span>
            </div>
            <div className="service-swiper-content-subtitle">
            {globalsData.acf.service_swiper_subtitle}
            </div>
            <Swiper slidesPerView={3} spaceBetween={30} pagination={{ clickable: true }} modules={[Pagination]} className="mySwiper">
            {services.map((service) => (
                <SwiperSlide key={service.id}>
                <Link href={`/services/${service.id}`}>
                <p>{service.title.rendered}</p>
                <p>text: {service.acf.service_info}</p>

                {/* Display the image URL */}
                {service.imageURL && (
                    <img src={service.imageURL} alt={service.title.rendered} />
                )}
                </Link>
                </SwiperSlide>
            ))}
            
            </Swiper>
          </div>
        </div>
      </section>
     );
}
 
export default ServiceSwiper;