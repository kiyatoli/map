import React from 'react';
import { useLocation } from 'react-router-dom';
import './DetailsPage.css'; // Add styles for the details page

const DetailsPage = () => {
  const location = useLocation();
  const { title, image, description, link } = location.state;

  return (
    <div className="details-page">
      <h2>{title}</h2>
      <img src={image} alt={title} className="details-image" />
      <p>{description}</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className="details-link">
        Visit Official Website
      </a>
    </div>
  );
};

export default DetailsPage;
