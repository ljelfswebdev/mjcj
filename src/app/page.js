"use client";

// components/Homepage.js
import React, { useEffect, useState } from 'react';
import '../styles/pages/homepage.scss';
import axios from 'axios';
import { fetchPageData } from '../utils/fetchPageData';
import ServiceSwiper from '../components/service-swiper';
import Faqs from '../components/faqs'

const Homepage = () => {
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const slug = 'homepage'; // Change this to the desired page slug
    fetchPageData(slug)
      .then((data) => {
        setPageData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching page data');
      });
  }, []);



  if (isLoading) {
    return( 
    <div className="loading">
      <img src="/loading.gif"/>
    </div> );
  }

  const { banner_image, parallax_image } = pageData.acf;


  return (
    <>
      <section className="homepage__banner">
        {banner_image && (
          <img src={banner_image} alt="Hero Banner" className="homepage__banner-background"/>
        )}
        <div className="homepage__banner-overlay"></div>
        <div className="container">
          <div className="homepage__banner-content">
            <div className="homepage__banner-content-title">
              {pageData.acf.banner_title}
            </div>
            <div className="homepage__banner-content-text">
              {pageData.acf.banner_text}
            </div>
          </div>
        </div>
      </section>
      <section className="homepage__usps"></section>

      <ServiceSwiper/>

      <section className="homepage__parallax" style={parallax_image ? { backgroundImage: `url(${parallax_image})` } : null}>
        <div className="homepage__parallax__overlay"></div>
        <div className="container">
          <div className="homepage__parallax__content">
          <div className="homepage__parallax__text" dangerouslySetInnerHTML={{ __html: pageData.acf.parallax_text }}></div>
          </div>
        </div>
      </section>

      <Faqs/>
      
    </>
  );
};

export default Homepage;
