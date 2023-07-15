import React,{useContext, useEffect, useState} from "react";
import App from "./App";
import axios from "axios";
const AppContext = React.createContext();

const AppProvider =({children})=>{


   
return <AppContext.Provider value={{name:'hello world'}}>
    {children}
</AppContext.Provider>

}


export const useGlobalContext=()=>{
    return useContext(AppContext);

}
export {AppContext,AppProvider};