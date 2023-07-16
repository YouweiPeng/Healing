import logo from './logo.svg';
import './App.css';
import { AppProvider } from './context';
import { useState } from 'react';
import SideBar from './components/sideBar';
import{BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MainPage from './pages/mainPage';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path='/' element={<MainPage />}>
          
        </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
