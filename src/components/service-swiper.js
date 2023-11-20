import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Link from 'next/link';
import { fetchServices } from '../utils/fetchServices';
import { useGlobalsContext } from '../utils/fetchGlobals';
import ServiceCard from './service-card';

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
          <div className="service-swiper__content">
            <div className="service-swiper__title">
              <span></span>{globalsData.acf.service_swiper_title}<span></span>
            </div>
            <Swiper 
            slidesPerView={1} 
            spaceBetween={30} 
            pagination={{ clickable: true }} 
            modules={[Pagination]} 
            className="mySwiper"
            breakpoints={{
              550: {
                slidesPerView: 2,
              },
              800: {
                slidesPerView: 3,
              }
            }}>
            {services.map((service) => (
                <SwiperSlide key={service.id}>
                  <ServiceCard service={service} key={service.id}/>
                </SwiperSlide>
            ))}
            
            </Swiper>
          </div>
        </div>
      </section>
     );
}
 
export default ServiceSwiper;