"use client";

import React, { useEffect, useState } from 'react';
import { useGlobalsContext } from '../../utils/fetchGlobals';
import { fetchPageData } from '../../utils/fetchPageData';

const Contact = () => {
    const globalsData = useGlobalsContext();
    const [pageData, setPageData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const slug = 'contact';
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

      if (isLoading) {
        return (
          <div className="loading">
            <img src="/loading.gif" alt="Loading..." />
          </div>
        );
      }

    return (
        <section className="contact">
            <div className="container">
                <div className="contact__content">
                    <div className="contact__content-title">
                        {pageData.acf.contact_title}
                    </div>
                    <div
                        className="contact__content-subtitle"
                        dangerouslySetInnerHTML={{ __html: pageData.acf.contact_sub_text }}
                    ></div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
