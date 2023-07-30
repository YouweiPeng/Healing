import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SideBar from '../components/sideBar';
import { useGlobalContext } from '../context';
import PageHomeButton from '../components/PageHomeButton';

const MentalTestPage = () => {
  const { isSidebarExpanded } = useGlobalContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedProblem, setSelectedProblem] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Sample available time options (you can replace this with your actual available times)
  const availableTimes = [
    { id: 1, time: 'Time slot 1' },
    { id: 2, time: 'Time slot 2' },
    { id: 3, time: 'Time slot 3' },
  ];

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any action you want with the form data (name, email, selectedProblem, selectedDate, selectedTime)
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Selected Problem:', selectedProblem);
    console.log('Selected Date:', selectedDate);
    console.log('Selected Time:', selectedTime);
    setName('');
    setEmail('');
    setSelectedProblem('');
    setSelectedDate('');
    setSelectedTime('');
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
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div style={{ margin: '20px 0' }}>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
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
              {/* Add more options as needed */}
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
              min={new Date().toISOString().split('T')[0]} // Set the minimum date to today
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
        </div>
        </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MentalTestPage;
