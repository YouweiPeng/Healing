import React from "react";
import SideBar from "../components/sideBar";
import { useGlobalContext } from "../context";
import {GiNightSleep} from 'react-icons/gi';
import {BsEmojiSunglassesFill} from 'react-icons/bs';
import {AiOutlineAim} from 'react-icons/ai';
import {BiSolidLeaf} from 'react-icons/bi';
import {BsSun} from 'react-icons/bs';
import { useState } from "react";
import{BsAlipay} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';
import Button from '@mui/material-next/Button';
import { useEffect } from "react";
function MainPage() {
    const {user,setUser} = useGlobalContext();
    const {cart, setCart,fetchCart} = useGlobalContext();
    const userName = user?.firstname || "Guest";
    const {isSidebarExpanded, setIsSidebarExpanded} = useGlobalContext();
    const navigate = useNavigate();
    const{button1Clicked, setButton1Clicked,button2Clicked, setButton2Clicked,button3Clicked, setButton3Clicked,button4Clicked, setButton4Clicked,button5Clicked, setButton5Clicked} = useGlobalContext();
    const handleButtonClick1 = () => {
        setButton1Clicked(!button1Clicked);
      };
    const handleButtonClick2 = () => {
        setButton2Clicked(!button2Clicked);
        };
    const handleButtonClick3 = () => {
        setButton3Clicked(!button3Clicked);
        };
    const handleButtonClick4 = () => {
        setButton4Clicked(!button4Clicked);
        };
    const handleButtonClick5 = () => {
        setButton5Clicked(!button5Clicked);
        };
    const handleDragStart = (e) => {
        e.preventDefault();
      };
    const handleContinueButton = () => {
        if(button1Clicked|| button2Clicked|| button3Clicked|| button4Clicked|| button5Clicked){
            navigate('/GuidePage');
        }
    };
    const handleSupportButton = () => {
        navigate('/SupportPage');
    };
    const handleLogOut = () => {
        setUser("");
        navigate('/');
    };
    useEffect(() => {
        fetchCart();
      }
      ,[]);

    console.log(cart)
    
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

      <div>
        <div className="mainPage" style={{ marginLeft: isSidebarExpanded ? '200px' : '90px' }}>

            <div className="background-container">
                
                <img class="background-img" src="/images/background.jpg" onDragStart={handleDragStart}/>
                <div className="image-overlay">
                    <p className="Logo-word">LOGO</p>
                    <div className="Option-container">
                        <h2>How can we help you ?</h2>
                        <h3>Our goal is to help you improve your health and happiness.</h3>
                        <button className={`option-button ${button1Clicked ? 'clicked' : ''}`} onClick={handleButtonClick1}> <GiNightSleep style={{ fontSize: '24px' , marginRight:'20px'}}/> Improve sleep quality</button>
                        <button className={`option-button ${button2Clicked ? 'clicked' : ''}`} onClick={handleButtonClick2}> <BsEmojiSunglassesFill style={{ fontSize: '24px' , marginRight:'20px'}}/> Reduce stress or anxiety</button>
                        <button className={`option-button ${button3Clicked ? 'clicked' : ''}`} onClick={handleButtonClick3}> <AiOutlineAim style={{ fontSize: '24px' , marginRight:'20px'}}/> Improve focus</button>
                        <button className={`option-button ${button4Clicked ? 'clicked' : ''}`} onClick={handleButtonClick4}> <BiSolidLeaf style={{ fontSize: '24px' , marginRight:'20px'}}/>Self-improvement</button>
                        <button className={`option-button ${button5Clicked ? 'clicked' : ''}`} onClick={handleButtonClick5}><BsSun style={{ fontSize: '24px' , marginRight:'20px' }} /> Something else</button>
                        
                        <button className={button1Clicked||button2Clicked||button3Clicked||button4Clicked||button5Clicked ? `option-button`:`Trans-button`}
                            onClick={handleContinueButton}
                        >{button1Clicked||button2Clicked||button3Clicked||button4Clicked||button5Clicked ? `Continue`:``}</button>
                    </div>
                <div className="user-profile">
                    <img className='user-profile-pic' src="../images/Default_Profile_Picture.png"/>
                    <h3>Hello, {userName}</h3>
                        <Button disabled={false} variant="filledTonal" >
                            Check my reservations
                            </Button>
                        <Button onClick={handleLogOut} style={{display:"block", margin:"auto", marginTop:"10px"}} disabled={false} variant="filledTonal" >
                            Log out
                            </Button>



                </div>
                <button onClick={handleSupportButton} className="support-button"><span className="support-text">support us! 	→ </span><BsAlipay/> </button>
                </div>
            </div>
            
            
        </div>

        <div>
            <SideBar />
        </div>
        
      </div>
      </motion.div>
    );
  }
  
  export default MainPage;
  