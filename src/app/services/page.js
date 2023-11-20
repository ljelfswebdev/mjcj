// Your Next.js page file
"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { fetchPageData } from '../../utils/fetchPageData';
import { fetchServices } from '../../utils/fetchServices';
import { useGlobalsContext } from '../../utils/fetchGlobals';
import ServiceCard from '../../components/service-card';

const ServicesPage = () => {
  const [pageData, setPageData] = useState(null);
  const globalsData = useGlobalsContext();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skillTerms, setSkillTerms] = useState([]);

  const [selectedSkill, setSelectedSkill] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);

  console.log(services);


  useEffect(() => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  
    const fetchSkillTerms = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/skill`);
        const skillTerms = response.data;
        setSkillTerms(skillTerms);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching terms of "skill" taxonomy:', error);
        setIsLoading(false);
      }
    };
  
    fetchSkillTerms();
  }, []);


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

  useEffect(() => {
    if (selectedSkill === '') {
  
      setFilteredServices(services);
    } else {
      const filtered = services.filter((service) => {
        if (Array.isArray(service.skill)) {
          return service.skill.includes(parseInt(selectedSkill));
        }
        return false;
      });
      setFilteredServices(filtered);
    }
  }, [selectedSkill, services]);
  
  const handleSkillChange = e => {
    setSelectedSkill(e.target.value);
  };


  if (isLoading || !globalsData) {
    return (
      <div className="loading">
        <img src="/loading.gif" alt="Loading..." />
      </div>
    );
  }

  return (
    <div className="services">
      <div className="container">
        <div className="services__content">
          <h1>{pageData.acf.page_title}</h1>
          <p dangerouslySetInnerHTML={{ __html: pageData.acf.page_sub_text }}></p>

          <div className="services__form">
            <form>
            <select onChange={handleSkillChange} value={selectedSkill}>
            <option value="">Select a Skill</option>
            {skillTerms &&
              skillTerms.map(term => (
                <option key={term.id} value={term.id}>
                  {term.name}
                </option>
              ))}
          </select>
            </form>
          </div>
          <div className="services__grid">
            {filteredServices.map((service) => (
              <ServiceCard service={service} key={service.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
