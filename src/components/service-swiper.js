import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { fetchServices } from '../utils/fetchServices';
import ServiceCard from './service-card';
import { fetchGlobalsData } from '../utils/fetchGlobals'; 

const ServiceSwiper = () => {
  const [services, setServices] = useState([]); // State to store fetched services
  const [globalsData, setGlobalsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGlobalsData();
        setGlobalsData(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchServices()
      .then((servicesWithImages) => {
        setServices(servicesWithImages);
      })
      .catch((error) => {
        console.log('Error fetching services:', error);
      });
  }, []);

  const serviceSwiperTitle = globalsData?.acf?.[0]?.service_swiper_title || '';


  return (
    <section className="service-swiper">
      <div className="container">
        <div className="service-swiper__content">
          <div className="service-swiper__title">
            <span></span>{serviceSwiperTitle}<span></span>
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
                {/* Assuming 'imageURL' is the property containing the image URL */}
                <ServiceCard service={service} imageURL={service.imageURL} key={service.id}/>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ServiceSwiper;
