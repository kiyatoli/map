import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './App.css';

const App = () => {
  const mapContainerRef = useRef(null);
  const [sidePanelContent, setSidePanelContent] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

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
        sections: [
          { id: 'overview', title: 'Overview', content: 'This is the main gate of Mettu University.' },
          { id: 'history', title: 'History', content: 'The gate was established in 1990 and has since been a landmark.' },
          { id: 'contact', title: 'Contact', content: 'You can contact the university at +251 123 456 789.' },
        ],
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
        sections: [
          { id: 'overview', title: 'Overview', content: 'The library is equipped with modern facilities for students.' },
          { id: 'rules', title: 'Rules', content: 'Maintain silence and handle books with care.' },
        ],
      },
    },
    {
      id: 3,
      title: 'Raha Cafe',
      coordinates: [35.559407, 8.317804],
      icon: '/images/coffee.png',
      popupContent: {
        title: 'Raha Cafe11111111',
        image: '/images/2023-01-30.jpg',
        description: 'A place to relax and enjoy your favorite beverages.',
        link: 'https://www.mettu.edu.et/cafe',
        sections: [
          { id: 'overview', title: 'Overview', content: 'A popular spot for students and staff to unwind.' },
          { id: 'menu', title: 'Menu', content: 'Serves a variety of coffees, teas, and snacks.' },
          { id: 'hours', title: 'Opening Hours', content: 'Open daily from 8 AM to 6 PM.' },
        ],
      },
    },
    {
      id: 4,
      title: 'Mau Cafeteria',
      coordinates: [35.556823, 8.319175],
      icon: '/images/dish.png',
      popupContent: {
        title: 'Mau Cafeteria',
        image: '/images/2023-01-30.jpg',
        description: 'A cozy place offering a variety of meals and refreshments for students and staff.',
        text: 'the block 9 is text',
        link: 'https://www.mettu.edu.et/cafeteria',
        text: 'the cafeteria is text',
        sections: [
          { id: 'menu', title: 'Menu', content: 'Offers breakfast, lunch, dinner, and snacks with vegetarian and non-vegetarian options.' },
          { id: 'hours', title: 'Operating Hours', content: 'Open from 7:00 AM to 9:00 PM, Monday to Saturday.' },
        ],
      },
    },
    {
      id: 5,
      title: 'Block 9',
      coordinates: [35.559210, 8.315757],
      icon: '/images/offices.png',
      popupContent: {
        title: 'Block 9',
        image: '/images/2023-01-30.jpg',
        description: 'Main Gate of Mettu University, known for its beautiful campus and quality education.',
        text: 'the block 9 is text',
        link: 'https://www.mettu.edu.et',
        sections: [
          { id: 'overview', title: 'Overview', content: 'This is the main gate of Mettu University.' },
          { id: 'history', title: 'History', content: 'The gate was established in 1990 and has since been a landmark.' },
          { id: 'contact', title: 'Contact', content: 'You can contact the university at +251 123 456 789.' },
          
        ],
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
    title.textContent = content.title;

    const image = document.createElement('img');
    image.src = content.image;
    image.alt = content.title;
    image.style.width = '100%';
    image.style.maxWidth = '200px';

    const description = document.createElement('p');
    description.textContent = content.description;

    const text= document.createElement ('p');
    text.textContent = content.text;

    const link = document.createElement('a');
    link.href = content.link;
    link.target = '_blank';
    link.textContent = 'Visit Official Website';

    const seeMoreButton = document.createElement('button');
    seeMoreButton.textContent = 'See More';
    seeMoreButton.onclick = () => openDetails(content);

    popupDiv.appendChild(title);
    popupDiv.appendChild(image);
    popupDiv.appendChild(description);
    popupDiv.appendChild(text);
    popupDiv.appendChild(link);
    popupDiv.appendChild(seeMoreButton);

    return popupDiv;
  };

  const openDetails = (content) => {
    setSidePanelContent(content);
    setActiveSection(content.sections ? content.sections[0].id : null);
  };

  const renderActiveSection = () => {
    if (!activeSection || !sidePanelContent) return null;
    const section = sidePanelContent.sections.find((sec) => sec.id === activeSection);
    return section ? <p>{section.content}</p> : <p>Section not found.</p>;
  };

  const closeSidePanel = () => {
    setSidePanelContent(null);
  };

  return (
    <div>
      <div ref={mapContainerRef} style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}></div>

      {sidePanelContent && (
        <div className="side-panel">
          <button className="close-button" onClick={closeSidePanel}>
            X
          </button>
          <h2>{sidePanelContent.title}</h2>
          <img
            src={sidePanelContent.image}
            alt={sidePanelContent.title}
            style={{ width: '100%', borderRadius: '8px' }}
          />
          <p>{sidePanelContent.description}</p>
          <a
            href={sidePanelContent.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Official Website
          </a>

          <div className="nav-bar">
            {sidePanelContent.sections.map((section) => (
              <button
                key={section.id}
                className={section.id === activeSection ? 'active' : ''}
                onClick={() => setActiveSection(section.id)}
              >
                {section.title}
              </button>
            ))}
          </div>

          <div className="section-content">{renderActiveSection()}</div>
        </div>
      )}
    </div>
  );
};

export default App;
