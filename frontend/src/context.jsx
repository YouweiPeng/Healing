import React,{useContext, useEffect, useState} from "react";
import App from "./App";
import axios from "axios";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const [recFriends, setRecFriends] = useState( JSON.parse(localStorage.getItem('recFriends'))||[
      {
          id : 1,
          name : "Oliver",
          img : "../images/cat.jpg",
          mutalFriends : "2",
          friend: false,
  
      },
  
      {
          id : 2,
          name : "Mimi",
          img : "../images/cat2.jpg",
          mutalFriends : "3",
          friend: false,
      },
  
      {
          id : 3,
          name : "Rex",
          img : "../images/dog.jpg",
          mutalFriends : "4",
          friend: false,
      },
      {
          id : 4,
          name : "John",
          img : "../images/mouse.png",
          mutalFriends : "5",
          friend: false,
      },
      {
          id : 5,
          name : "Josh",
          img : "../images/duck.jpeg",
          mutalFriends : "6",
          friend: false,
      },
      {
          id : 6,
          name : "Marry",
          img : "../images/pig.jpg",
          mutalFriends : "7",
          friend: false,
      },
      {
          id : 7,
          name : "Jason",
          img : "../images/Cap.webp",
          mutalFriends : "8",
          friend: true,
      }

  ]);
  const [storeItems, setStoreItems] = useState([
    {
        id : 1,
        name : "test product 1",
        img: "../images/testProduct.png",
        price : 1199,

    },
    {
        id : 2,
        name : "test product 2",
        img: "../images/testProduct.png",
        price : 1299,
    },
    {
        id : 3,
        name : "test product 3",
        img: "../images/testProduct.png",
        price : 1399,

    },
    {
        id : 4,
        name : "test product 4",
        img: "../images/testProduct.png",
        price : 1499,
    },
    {
        id : 5,
        name : "test product 5",
        img: "../images/testProduct.png",
        price : 1599,
    },
    {
        id : 6,
        name : "test product 6",
        img: "../images/testProduct.png",
        price : 1699,
    },
    {

        id : 7,
        name : "test product 7",
        img: "../images/testProduct.png",
        price : 1799,
    },
    {
        id : 8,
        name : "test product 8",
        img: "../images/testProduct.png",
        price : 1899,
    },
    {
        id : 9,
        name : "test product 9",
        img: "../images/testProduct.png",
        price : 1999,
    },
  ])
  const [cart, setCart] = useState( JSON.parse(localStorage.getItem('cart'))||[]);
      useEffect(() => {
        localStorage.setItem('recFriends', JSON.stringify(recFriends));
        
      }, [recFriends]);
      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
      }, [cart]);
      const cartQuantity = () => {
        let quantity = 0;
        cart.forEach((item) => {
          quantity += item.quantity;
        });
        return quantity;
      }
    return (
      <AppContext.Provider value={{ isSidebarExpanded, setIsSidebarExpanded ,recFriends, setRecFriends, storeItems,cart, setCart,cartQuantity}}>
        {children}
      </AppContext.Provider>
    );
  };


export const useGlobalContext=()=>{
    return useContext(AppContext);

}
export {AppContext,AppProvider};