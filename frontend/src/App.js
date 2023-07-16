import logo from './logo.svg';
import './App.css';
import { AppProvider } from './context';
import { useState } from 'react';
import SideBar from './components/sideBar';
import{BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MainPage from './pages/mainPage';
import GuidePage from './pages/GuidePage';
import SupportPage from './pages/SupportPage';
import CommunityPage from './pages/CommunityPage';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path='/' element={<MainPage />}>
        </Route>
        <Route path="/GuidePage" element={<GuidePage
          
          /> }>
        </Route>
        <Route path="/SupportPage" element={<SupportPage
          
          /> }>

          </Route>
          <Route path="/CommunityPage" element={<CommunityPage
          
          /> }>

          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
