"use client";

import React, { useEffect, useState } from 'react';
import { fetchPageData } from '../../utils/fetchPageData';
import axios from "axios";

const Contact = () => {
    const [pageData, setPageData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [formData, setFormData] = useState({
      yourName: "",
      yourEmail: "",
      yourMessage: "",
      yourFiles: null, 
    });
  
    const handleFileChange = (event) => {
      const selectedFiles = event.target.files;
      const newFiles = Array.from(selectedFiles); // Convert FileList to array
    
      // Append new files to the existing files array in state
      setFormData((prevData) => ({
        ...prevData,
        yourFiles: prevData.yourFiles ? [...prevData.yourFiles, ...newFiles] : newFiles,
      }));
    };

    const displayUploadedFiles = formData.yourFiles && formData.yourFiles.length > 0 && (
      <div>
        <h3>Uploaded Files:</h3>
        <ul>
          {formData.yourFiles.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
    );
    
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const apiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    
      try {
        const form = new FormData();
    
        // Append other form fields
        form.append('yourName', formData.yourName);
        form.append('yourEmail', formData.yourEmail);
        form.append('yourMessage', formData.yourMessage);
    
        // Append multiple files
        if (formData.yourFiles) {
          for (let i = 0; i < formData.yourFiles.length; i++) {
            form.append(`yourFiles[${i}]`, formData.yourFiles[i]);
          }
        }
    
        // Make a POST request using Axios
        const response = await axios.post(
          `${apiBaseUrl}wp-json/contact-form-7/v1/contact-forms/56/feedback`,
          form,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
    
        console.log('Response:', response.data);
        // Handle success, you might want to redirect the user or show a success message
      } catch (error) {
        console.error('Error:', error);
        // Handle error, display an error message to the user, etc.
      }
    };
    
    

  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  

    useEffect(() => {
        const slug = 'contact-us';
        fetchPageData(slug)
          .then((data) => {
            setPageData(data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.log('Error fetching page data', error);
            setIsLoading(false);
          });
      }, []);

    if (isLoading || !globalsData) {
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
                    <div>
                      <form onSubmit={handleSubmit}>
                        <input
                          type="text"
                          name="yourName"
                          placeholder="Your Name"
                          value={formData.yourName}
                          onChange={handleChange}
                        />
                        <input
                          type="email"
                          name="yourEmail"
                          placeholder="Your Email"
                          value={formData.yourEmail}
                          onChange={handleChange}
                        />
                        <textarea
                          name="yourMessage"
                          placeholder="Your Message"
                          value={formData.yourMessage}
                          onChange={handleChange}
                        ></textarea>

                        <input
                          type="file"
                          name="yourFiles"
                          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                          onChange={handleFileChange}
                          multiple // Allow multiple file selection
                        />

                        <button type="submit">Submit</button>
                      </form>

                      {displayUploadedFiles}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
