import logo from "./logo.svg";
import "./App.css";
import { AppProvider } from "./context";
import { useState } from "react";
import SideBar from "./components/sideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage";
import GuidePage from "./pages/GuidePage";
import SupportPage from "./pages/SupportPage";
import CommunityPage from "./pages/CommunityPage";
import ContactUsPage from "./pages/ContactUsPage";
import StorePage from "./pages/StorePage";
import MentalTestPage from "./pages/MentalTestPage";
import ArticlePage from "./pages/ArticlePage";
import { motion, AnimatePresence } from 'framer-motion';
import CheckOutPage from "./pages/CheckOutPage";
function App() {
  return (
    <div className="App">
      <Router>
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
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/GuidePage" element={<GuidePage />}></Route>
            <Route path="/SupportPage" element={<SupportPage />}></Route>
            <Route path="/CommunityPage" element={<CommunityPage />}></Route>
            <Route path="/ContactUsPage" element={<ContactUsPage />}></Route>
            <Route path="/StorePage" element={<StorePage />}></Route>
            <Route path="/MentalTestPage" element={<MentalTestPage />}></Route>
            <Route path="/ArticlePage" element={<ArticlePage />}></Route>
            <Route path="/CheckOutPage" element={<CheckOutPage />}></Route>
          </Routes>
          </motion.div>
      </Router>
    </div>
  );
}

export default App;
