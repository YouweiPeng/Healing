import logo from './logo.svg';
import './App.css';
import { AppProvider } from './context';
import { useState } from 'react';
import SideBar from './components/sideBar';
function App() {
  return (
    <div className="App">
      <SideBar />
    </div>
  );
}

export default App;
