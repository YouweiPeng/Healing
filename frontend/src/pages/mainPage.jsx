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
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
function MainPage() {
    const {user,setUser} = useGlobalContext();
    const [showOrdersModal, setShowOrdersModal] = useState(false);
    const {cart, setCart,fetchCart} = useGlobalContext();
    const {userAppointments, setUserAppointments, fetchAppointments} = useGlobalContext();
    const userName = user?.firstname || "Guest";
    const {isSidebarExpanded, setIsSidebarExpanded} = useGlobalContext();
    const {fetchOrders_by_user, userOrders, setUserOrders} = useGlobalContext();
    const navigate = useNavigate();
    const{button1Clicked, setButton1Clicked,button2Clicked, setButton2Clicked,button3Clicked, setButton3Clicked,button4Clicked, setButton4Clicked,button5Clicked, setButton5Clicked} = useGlobalContext();
    const [showModal, setShowModal] = useState(false);
    const [expandReservationModal, setExpandReservationModal] = useState(false);
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
    useEffect(() => {
        fetchAppointments();
        }
        ,[]);
      useEffect(() => {
        fetchOrders_by_user();
        }
        ,[]);
    const handleOpenModal = () => {
        setShowModal(true);
        };
        const handleCloseModal = () => {
        setShowModal(false);
        };
    const handleOpenOrdersModal = () => {
      setShowOrdersModal(true);
    };
  
    const handleCloseOrdersModal = () => {
      setShowOrdersModal(false);
    };
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    };

    const sortedUserOrders = userOrders.slice().sort((a, b) => {
      return new Date(a.order.orderDate) - new Date(b.order.orderDate);
    });

    console.log(cart)
    console.log(userAppointments)
    console.log(userOrders)
    const sortedAppointments = userAppointments.slice().sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
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
                        <Button disabled={false} variant="filledTonal" 
                        onClick={handleOpenModal}
                        >
                            Check my reservations
                            </Button>
                            <Button 
                            onClick={handleOpenOrdersModal}
                            disabled={false} variant="filledTonal"  style={{display:"block", margin:"auto", marginTop:"10px"}}>
                            Check my orders
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
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="reservation-modal"
        aria-describedby="user-reservations"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: '40vw',
            maxHeight: '90vh',
            overflowY: 'auto', 
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" id="modal-modal-title">
            {userName}'s Reservations
          </Typography>
          {sortedAppointments.map((appointment) => (
            <Paper
              key={appointment.id}
              elevation={3}
              style={{ padding: "10px", marginTop: "10px" }}
            >
              <Typography variant="body1"
              >
                Date: {appointment.date}
              </Typography>
              {/* Expandable details */}
              { (
                <div>
                  <Typography variant="body1">
                    Patient: {appointment.name}
                  </Typography>
                  <Typography variant="body1">
                    Mental Problem: {appointment.problem}
                  </Typography>
                  <Typography variant="body1">
                    Time: {appointment.time}
                  </Typography>
                </div>
              )}
            </Paper>
          ))}
        </Box>
      </Modal>

      <Modal
      open={showOrdersModal}
      onClose={handleCloseOrdersModal}
      aria-labelledby="orders-modal"
      aria-describedby="user-orders"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: '50vw',
          maxHeight: '90vh',
          overflowY: 'auto', 
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" id="modal-modal-title">
          {userName}'s Orders
        </Typography>
        {sortedUserOrders.map((orderData) => (
          <Paper
            key={orderData.order.id}
            elevation={3}
            style={{ padding: "10px", marginTop: "10px" }}
          >
            <Typography variant="body1">
              Order Date: {formatDate(orderData.order.orderDate)}
            </Typography>
            <Typography variant="body1">
              Total Price: ${orderData.order.totalPrice}
            </Typography>
            <ul>
              {orderData.orderItems.map((item) => (
                <li key={item.id}>
                  Product: {item.product}, Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </Paper>
        ))}
      </Box>
    </Modal>
      </motion.div>
    );
  }
  
  export default MainPage;
  