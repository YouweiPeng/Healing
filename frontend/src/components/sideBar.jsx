import{BsLayoutSidebarInset} from 'react-icons/bs';
import {FaUserFriends} from 'react-icons/fa';
import{PiShoppingCart} from 'react-icons/pi';
import{GrArticle} from 'react-icons/gr';
import{FaStethoscope} from 'react-icons/fa';
import{BsTelephoneOutboundFill} from 'react-icons/bs';
import React, { useState } from 'react';
import {BsArrowBarRight} from 'react-icons/bs';
import{BsArrowBarLeft} from 'react-icons/bs';
import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router-dom';
import {PiTarget} from 'react-icons/pi';

function SideBar() {
    const {isSidebarExpanded, setIsSidebarExpanded} = useGlobalContext();
    const handleClick = () => {
      setIsSidebarExpanded(!isSidebarExpanded);

    };
    const navigate = useNavigate();
    const handleCommunity = () => {
      navigate('/CommunityPage');
    };
    const handleStore = () => {
      navigate('/StorePage');
    };
    const handleArticles = () => {
      navigate('/ArticlePage');
    };
    const handleMentalTest = () => {
      navigate('/MentalTestPage');
    };
    const handleContactUs = () => {
      navigate('/ContactUsPage');
    };
    const handleGoals = () => {
      navigate('/GoalsPage');
    };
  
    return (
      <div>
        <section className={`sideBar-body ${isSidebarExpanded ? 'expanded' : ''}`}>
          <button className='sideBar-btn' onClick={handleClick}>
          {isSidebarExpanded ? <BsArrowBarLeft /> : <BsArrowBarRight />}
          </button>
          <button className='sideBar-btn community-button' onClick={handleCommunity}>
            <FaUserFriends />
            {isSidebarExpanded && <span>Community</span>}
          </button>
          <button className='sideBar-btn' onClick={handleStore}>
            <PiShoppingCart />
            {isSidebarExpanded && <span>Store</span>}
          </button>
          <button className='sideBar-btn' onClick={handleGoals}>
            <PiTarget />
            {isSidebarExpanded && <span>Your goals</span>}
          </button>
          <button className='sideBar-btn' onClick={handleArticles}>
            <GrArticle />
            {isSidebarExpanded && <span>Articles</span>}
          </button>
          <button className='sideBar-btn' onClick={handleMentalTest}>
            <FaStethoscope />
            {isSidebarExpanded && <span>Doctor</span>}
          </button>
          <button className='sideBar-btn' onClick={handleContactUs}>
            <BsTelephoneOutboundFill />
            {isSidebarExpanded && <span>Contact us</span>}
          </button>
        </section>
      </div>
    );
  }
  
  
  export default SideBar;