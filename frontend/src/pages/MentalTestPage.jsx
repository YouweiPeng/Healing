import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SideBar from '../components/sideBar';
import { useGlobalContext } from '../context';
import PageHomeButton from '../components/PageHomeButton';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
const MentalTestPage = () => {
  const {user} = useGlobalContext();
  const { isSidebarExpanded } = useGlobalContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedProblem, setSelectedProblem] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // Sample available time options (you can replace this with your actual available times)
  const availableTimes = [
    { id: 1, time: '10:00' },
    { id: 2, time: '11:00' },
    { id: 3, time: '13:00' },
    { id: 4, time: '15:00' },
  ];

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any action you want with the form data (name, email, selectedProblem, selectedDate, selectedTime)
    setName('');
    setEmail('');
    setSelectedProblem('');
    setSelectedDate('');
    setSelectedTime('');
    const data = {
      name: user.firstname+" "+user.lastname,
      email: user.email,
      CustomerId: user.CustomerId,
      problem: selectedProblem,
      date: selectedDate,
      time: selectedTime,
    };
    console.log(data);
    const createAppointment = async () => {
      try{
      const response = await axios.post('http://127.0.0.1:8000/api/create_appointment/', data);
      console.log(response);
      setIsAlertOpen(true);
      }
      catch(error){
        console.log(error);
      }
    };
    createAppointment();
  };

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
      <div style={{ marginLeft: isSidebarExpanded ? '200px' : '90px', position: 'relative' }}>
        <div className='container'>
        <PageHomeButton />
        <div>
        <h1>Wanna be helped?</h1>
        <h3>Our professionals will help you out!</h3>
        </div>
        <SideBar />




        <div className='container-Mental'>
        <div className='doc-img-div'>
          <img src="../images/Doctor.jpg"/>
        </div>
      <div className='info-div'>
        <form onSubmit={handleSubmit}>


          <div style={{ margin: '20px 0' }}>
            <label htmlFor="problem">Select a problem: </label>
            <select
              id="problem"
              value={selectedProblem}
              onChange={(e) => setSelectedProblem(e.target.value)}
              required
            >
              <option value="">Select a problem </option>
              <option value="Problem 1">Problem 1</option>
              <option value="Problem 2">Problem 2</option>
              <option value="Problem 3">Problem 3</option>
              <option value="Problem 4">Problem 4</option>
              <option value="Problem 5">Problem 5</option>
            </select>
          </div>
          <div style={{ margin: '20px 0' }}>
            <label htmlFor="date">Select a date: </label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
              min={new Date().toISOString().split('T')[0]} 
            />
          </div>
          <div style={{ margin: '20px 0' }}>
            <label htmlFor="time">Select an available time: </label>
            <select
              id="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              required
            >
              <option value="">Select an available time</option>
              {availableTimes.map((timeOption) => (
                <option key={timeOption.id} value={timeOption.time}>
                  {timeOption.time}
                </option>
              ))}
            </select>
          </div>
          <button className='submit-button' type="submit">Confirm and Book</button>
        </form>
        {isAlertOpen && (
              <div className="alert-overlay">
                <div className="alert-center">
                  <Alert
                    action={
                      <Button color="inherit" size="small" onClick={() => setIsAlertOpen(false)}>
                        Close
                      </Button>
                    }
                    severity="success"
                  >
                    <AlertTitle>Success</AlertTitle>
                    Your appointment has been booked successfully!
                  </Alert>
                </div>
              </div>
            )}
        </div>
        </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MentalTestPage;
