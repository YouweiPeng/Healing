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

  ])
  const [articleTopics,setArticleTopics] = useState(JSON.parse(localStorage.getItem('articleTopics'))||[
    { id: 1, title: 'Topic 1', like:true, content: 'Mental health is all about how people think, feel, and behave. Mental health specialists can help people with depression, anxiety, bipolar disorder, addiction, and other conditions that affect their thoughts, feelings, and behaviors.Mental health can affect daily living, relationships, and physical health.However, this link also works in the other direction. Factors in people’s lives, interpersonal connections, and physical factors can contribute to mental ill health. Looking after mental health can preserve a person’s ability to enjoy life. Doing this involves balancing life activities, responsibilities, and efforts to achieve psychological resilience. Stress, depression, and anxiety can all affect mental health and disrupt a person’s routine. Although health professionals often use the term mental health, doctors recognize that many psychological disorders have physical roots.This article explains what people mean by mental health and mental illness. We also describe the most common types of mental disorders, including their early signs and how to treat them.' },
    { id: 2, title: 'Topic 2', like:false, content: 'Content for Topic 2' },
    { id: 3, title: 'Topic 3', like:false, content: 'Content for Topic 3' },
  ]);
  const [Goals, setGoals] = useState(JSON.parse(localStorage.getItem('Goals')) ||[
    { id: 1, title: 'Goal 1', Finished:false, dueDate: '2021-05-01',comment:"Goal 1 comment" },
    { id: 2, title: 'Goal 2', Finished:false, dueDate: '2023-07-22',comment:"Goal 2 comment"},
    { id: 3, title: 'Goal 3', Finished:false,  dueDate: '2023-12-31',comment:"Goal 3 comment"},
  ]);
  const [button1Clicked, setButton1Clicked] = useState(false);
  const [button2Clicked, setButton2Clicked] = useState(false);
  const [button3Clicked, setButton3Clicked] = useState(false);
  const [button4Clicked, setButton4Clicked] = useState(false);
  const [button5Clicked, setButton5Clicked] = useState(false);

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
      useEffect(() => {
        localStorage.setItem('articleTopics', JSON.stringify(articleTopics));
    }, [articleTopics]);
    useEffect(() => {
      localStorage.setItem('Goals', JSON.stringify(Goals));
  }, [Goals]);
    return (
      <AppContext.Provider value={{ isSidebarExpanded, setIsSidebarExpanded ,recFriends, setRecFriends, storeItems,cart, setCart,cartQuantity,articleTopics,setArticleTopics,Goals,setGoals,
        button1Clicked, setButton1Clicked,button2Clicked, setButton2Clicked,button3Clicked, setButton3Clicked,button4Clicked, setButton4Clicked,button5Clicked, setButton5Clicked,setStoreItems
      }}>
        {children}
      </AppContext.Provider>
    );
  };


export const useGlobalContext=()=>{
    return useContext(AppContext);

}
export {AppContext,AppProvider};