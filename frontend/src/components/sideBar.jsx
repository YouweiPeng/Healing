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

function SideBar() {
    const {isSidebarExpanded, setIsSidebarExpanded} = useGlobalContext();
    const handleClick = () => {
      setIsSidebarExpanded(!isSidebarExpanded);

    };
    const navigate = useNavigate();
    const handleCommunity = () => {
      navigate('/CommunityPage');
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
          <button className='sideBar-btn'>
            <PiShoppingCart />
            {isSidebarExpanded && <span>Store</span>}
          </button>
          <button className='sideBar-btn'>
            <GrArticle />
            {isSidebarExpanded && <span>Articles</span>}
          </button>
          <button className='sideBar-btn'>
            <FaStethoscope />
            {isSidebarExpanded && <span>Mental test</span>}
          </button>
          <button className='sideBar-btn'>
            <BsTelephoneOutboundFill />
            {isSidebarExpanded && <span>Contact us</span>}
          </button>
        </section>
      </div>
    );
  }
  
  
  export default SideBar;