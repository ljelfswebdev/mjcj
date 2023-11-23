"use client";

// components/Homepage.js
import React, { useEffect, useState } from 'react';
import '../styles/pages/homepage.scss';
import axios from 'axios';
import { fetchImageURL } from '../utils/image';
import { useGlobalsContext } from '../utils/fetchGlobals';
import { fetchPageData } from '../utils/fetchPageData';
import ServiceSwiper from '../components/service-swiper';
import Faqs from '../components/faqs'

const Homepage = () => {
  const globalsData = useGlobalsContext();
  const [pageData, setPageData] = useState(null);
  const [bannerImageURL, setBannerImageURL] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const slug = 'homepage'; // Change this to the desired page slug
    fetchPageData(slug)
      .then((data) => {
        setPageData(data);
        setIsLoading(false);

        // Fetch the banner image URL
        const bannerImageID = data.acf.banner_image;
        if (bannerImageID) {
          fetchImageURL(bannerImageID)
            .then((url) => setBannerImageURL(url))
            .catch((error) => {
              setIsLoading(false);
              console.log('Error fetching this image')
            });
        }

        const parallaxImageID = data.acf.parallax_image;
        if (parallaxImageID) {
          fetchImageURL(parallaxImageID)
            .then((url) => setBannerImageURL(url))
            .catch((error) => {
              console.log('Error fetching this image')
            });
        }
      })
      .catch((error) => {
        console.log('Error fetching page data');
      });
  }, []);

  if (isLoading || !globalsData) {
    return( 
    <div className="loading">
      <img src="/loading.gif"/>
    </div> );
  }

  return (
    <>
      <section className="homepage__banner">
        {/* Use the fetched bannerImageURL */}
        {bannerImageURL && (
          <img src={bannerImageURL} alt="Hero Banner" className="homepage__banner-background"/>
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

      <section className="homepage__parallax" style={bannerImageURL ? { backgroundImage: `url(${bannerImageURL})` } : null}>
        <div className="homepage__parallax__overlay"></div>
        <div classNme="container">
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
