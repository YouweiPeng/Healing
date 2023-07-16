import React,{useContext, useEffect, useState} from "react";
import App from "./App";
import axios from "axios";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  
    return (
      <AppContext.Provider value={{ isSidebarExpanded, setIsSidebarExpanded }}>
        {children}
      </AppContext.Provider>
    );
  };


export const useGlobalContext=()=>{
    return useContext(AppContext);

}
export {AppContext,AppProvider};