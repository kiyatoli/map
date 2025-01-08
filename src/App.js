import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './App.css'; // Combined styles for Map and Popup

const App = () => {
  const mapContainerRef = useRef(null);

  const markersData = [
    {
      id: 1,
      title: 'Mau Gate',
      coordinates: [35.5592988160932, 8.31862701811819],
      icon: '/images/torri-gate.png',
      popupContent: {
        title: 'Mettu University Gate',
        image: '/images/2023-01-30.jpg',
        description: 'Main Gate of Mettu University, known for its beautiful campus and quality education.',
        link: 'https://www.mettu.edu.et',
      },
    },
    {
      id: 2,
      title: 'Central Library',
      coordinates: [35.558266, 8.318367],
      icon: '/images/book.png',
      popupContent: {
        title: 'Central Library',
        image: '/images/2023-06-24.jpg',
        description: 'A place to access knowledge and study.',
        link: 'https://www.mettu.edu.et/library',
      },
    },
    {
      id: 3,
      title: 'Raha Cafe',
      coordinates: [35.559407, 8.317804],
      icon: '/images/coffee.png',
      popupContent: {
        title: 'Raha Cafe',
        image: '/images/2023-01-30.jpg',
        description: 'A place to relax and enjoy your favorite beverages.',
        link: 'https://www.mettu.edu.et/cafe',
      },
    },
  ];

  useEffect(() => {
    const key = 'p0PAWI3muE2doYKnQGWq';

    const bounds = [
      [35.5400, 8.3000], 
      [35.5700, 8.3280],
    ];

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${key}`,
      center: [35.558289, 8.319754],
      zoom: 16,
      minZoom: 15,
      maxZoom: 18,
      maxBounds: bounds,
    });

    markersData.forEach((marker) => {
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';

      const textElement = document.createElement('span');
      textElement.className = 'marker-text';

      const iconImage = document.createElement('img');
      iconImage.src = marker.icon;
      iconImage.alt = marker.title;
      iconImage.style.width = '25px';
      iconImage.style.height = '25px';
      iconImage.style.marginRight = '7px';

      textElement.appendChild(iconImage);
      textElement.appendChild(document.createTextNode(marker.title));
      markerElement.appendChild(textElement);

      new maplibregl.Marker({ element: markerElement, anchor: 'bottom' })
        .setLngLat(marker.coordinates)
        .setPopup(
          new maplibregl.Popup({ offset: 25 }).setDOMContent(createPopupContent(marker.popupContent))
        )
        .addTo(map);
    });

    return () => map.remove();
  }, []);

  const createPopupContent = (content) => {
    const popupDiv = document.createElement('div');
    popupDiv.className = 'popup-content';

    const title = document.createElement('h3');
    title.style.margin = '0';
    title.textContent = content.title;

    const image = document.createElement('img');
    image.src = content.image;
    image.alt = content.title;
    image.style.width = '100%';
    image.style.maxWidth = '200px';
    image.style.borderRadius = '8px';

    const description = document.createElement('p');
    description.style.margin = '10px 0';
    description.textContent = content.description;

    const link = document.createElement('a');
    link.href = content.link;
    link.target = '_blank';
    link.className = 'popup-link';
    link.textContent = 'Visit Official Website';

    const seeMoreButton = document.createElement('button');
    seeMoreButton.textContent = 'See More';
    seeMoreButton.className = 'see-more-button';
    seeMoreButton.onclick = () => openDetails(content);

    popupDiv.appendChild(title);
    popupDiv.appendChild(image);
    popupDiv.appendChild(description);
    popupDiv.appendChild(link);
    popupDiv.appendChild(seeMoreButton);

    return popupDiv;
  };

  const openDetails = (content) => {
    let sidePanel = document.querySelector('.side-panel');
  
    if (!sidePanel) {
      // Create the side panel if it doesn't exist
      sidePanel = document.createElement('div');
      sidePanel.className = 'side-panel';
      sidePanel.style.position = 'relative';
      sidePanel.style.top = '10%';
      sidePanel.style.left = '0';
      sidePanel.style.width = '20%';
      sidePanel.style.height = '615px';
      sidePanel.style.backgroundColor = '#fff';
      sidePanel.style.border = '1px solid #ccc';
      sidePanel.style.padding = '10px';
      sidePanel.style.overflowY = 'auto';
      sidePanel.style.zIndex = '1000';
  
      // Append the panel to the body
      document.body.appendChild(sidePanel);
    }
  
    // Update the side panel's content
    sidePanel.innerHTML = `
      <h2>${content.title}</h2>
      <img src="${content.image}" alt="${content.title}" style="width: 100%; border-radius: 8px;" />
      <p>${content.description}</p>
      <a href="${content.link}" target="_blank" class="popup-link">Visit Official Website</a>
      <button onclick="document.body.removeChild(this.parentNode)" style="margin-top: 10px;">Close</button>
    `;
  };
  
  return <div ref={mapContainerRef} style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}></div>;
};

export default App;
