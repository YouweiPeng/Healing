import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SideBar from '../components/sideBar';
import { useGlobalContext } from '../context';
import PageHomeButton from '../components/PageHomeButton';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import {AiOutlineInstagram} from 'react-icons/ai';
import {AiOutlineTwitter} from 'react-icons/ai';
import {BsFacebook} from 'react-icons/bs';
const ContactUsPage = () => {
  const { isSidebarExpanded } = useGlobalContext();
  mapboxgl.accessToken = 'pk.eyJ1IjoicGRkOTkiLCJhIjoiY2xrOGo3dXduMGhvbjNtb2E3dWM1dGEwNiJ9.2TNAx8CXNcbFoK04s2sYAA';

  const mapContainer = useRef(null);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-79.387126, 43.642604],
      zoom: 15,
    });
    const marker1 = new mapboxgl.Marker({color: 'red'})
    .setLngLat([-79.387126, 43.642604])
    .addTo(map);
    const popup = new mapboxgl.Popup({ closeOnClick: false ,anchor:'top-right'}).setLngLat([-79.387126, 43.642604]).setHTML('<h3>Our location!</h3>').addTo(map);

  }, []); 

  return (
    <motion.div
      initial="page-entering"
      animate="page-entered"
      exit="page-entering"
      variants={{
        'page-entering': { opacity: 0 },
        'page-entered': { opacity: 1 },
      }}
      transition={{ duration: 1 }}
    >
      <h1>Contact us</h1>
      <PageHomeButton />
      <div className="container-contact" style={{ marginLeft: isSidebarExpanded ? '210px' : '100px', position: 'relative' }}>
        <div className='map-container' id="map" ref={mapContainer}></div>
        <div className='contact-info'>
        <div className='sec'>
        <button><AiOutlineInstagram/></button>
        <h3>Instagram</h3>
        </div>
        <div className='sec'>
          <button><AiOutlineTwitter/></button>
          <h3>Twitter</h3>
        </div>
        <div className='sec'>
          <button><BsFacebook/></button>
          <h3>Facebook</h3>
        </div>
            <div>
            <h3 className='section-name'>Email:</h3>
              <p className='content'>###@#####</p>
            </div>
            <div>
            <h3 className='section-name'>Phone:</h3>
            <p className='content'>###-###-####</p>
            </div>

        <div>
            <h3 className='section-name'>Office:</h3>
            <h3 className='content'>(Location)</h3>
            </div>
        </div>
        <SideBar />
      </div>
    </motion.div>
  );
};

export default ContactUsPage;
