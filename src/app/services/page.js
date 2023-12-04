// Your Next.js page file
"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchPageData } from '../../utils/fetchPageData';
import { fetchServices } from '../../utils/fetchServices';
import ServiceCard from '../../components/service-card';

const ServicesPage = () => {
  const [pageData, setPageData] = useState(null);
  const apiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skillTerms, setSkillTerms] = useState([]);

  const [selectedSkill, setSelectedSkill] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 3;

  const [totalServices, setTotalServices] = useState(0);

  useEffect(() => {
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
      .then((allServices) => {
        setTotalServices(allServices.length);
        const slicedServices = allServices.slice(0, servicesPerPage);
        setServices(slicedServices);
        setFilteredServices(allServices);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching services:', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * servicesPerPage;
    const endIndex = startIndex + servicesPerPage;
    setServices(filteredServices.slice(startIndex, endIndex));
  }, [currentPage, filteredServices]);

  const applyFilters = () => {
    let filtered = filteredServices;
  
    if (selectedSkill !== '') {
      filtered = filtered.filter((service) => {
        if (Array.isArray(service.skill)) {
          return service.skill.includes(parseInt(selectedSkill));
        }
        return false;
      });
    }
  
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter((service) =>
        service.title.rendered.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    setTotalServices(filtered.length); // Update totalServices with filtered length
    setServices(filtered.slice(0, servicesPerPage));
  };
  
  useEffect(() => {
    setTotalServices(filteredServices.length);
  }, [filteredServices]);
  

  const handleSkillChange = (e) => {
    setSelectedSkill(e.target.value);
    applyFilters();
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    applyFilters();
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalServices / servicesPerPage);

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button key={i} onClick={() => handlePagination(i)}>
          {i}
        </button>
      );
    }
    return pages;
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
          <h1>{pageData?.acf.page_title}</h1>
          <p dangerouslySetInnerHTML={{ __html: pageData?.acf.page_sub_text }}></p>

          <div className="services__form">
            <form>
              <select onChange={handleSkillChange} value={selectedSkill}>
                <option value="">Select a Skill</option>
                {skillTerms &&
                  skillTerms.map((term) => (
                    <option key={term.id} value={term.id}>
                      {term.name}
                    </option>
                  ))}
              </select>
              <input
                type="search"
                placeholder="Search by title"
                value={searchQuery}
                onChange={handleInputChange}
              />
            </form>
          </div>
          <div className="services__grid">
            {services.map((service) => (
              <ServiceCard service={service} key={service.id} />
            ))}
          </div>

          <div className="pagination">
            {renderPagination()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
