import React from "react";
import SideBar from "../components/sideBar";
import { useGlobalContext } from "../context";
import background from"../images/background.jpg"
import {GiNightSleep} from 'react-icons/gi';
import {BsEmojiSunglassesFill} from 'react-icons/bs';
import {AiOutlineAim} from 'react-icons/ai';
import {BiSolidLeaf} from 'react-icons/bi';
import {BsSun} from 'react-icons/bs';
import { useState } from "react";
import{BsAlipay} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
function MainPage() {
    const {isSidebarExpanded, setIsSidebarExpanded} = useGlobalContext();
    const navigate = useNavigate();
    const [button1Clicked, setButton1Clicked] = useState(false);
    const [button2Clicked, setButton2Clicked] = useState(false);
    const [button3Clicked, setButton3Clicked] = useState(false);
    const [button4Clicked, setButton4Clicked] = useState(false);
    const [button5Clicked, setButton5Clicked] = useState(false);
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
    return (
      <div>
        <div className="mainPage" style={{ marginLeft: isSidebarExpanded ? '200px' : '90px' }}>

            <div className="background-container">
                
                <img class="background-img" src={background} onDragStart={handleDragStart}/>
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
                <button onClick={handleSupportButton} className="support-button"><span className="support-text">support us! 	→ </span><BsAlipay/> </button>
                </div>
            </div>
            
            
        </div>

        <div>
            <SideBar />
        </div>
        
      </div>
    );
  }
  
  export default MainPage;
  