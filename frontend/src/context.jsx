import React,{useContext, useEffect, useState} from "react";
import App from "./App";
import axios from "axios";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const [user, setUser] = useState();
    const [cartDataFetched, setCartDataFetched] = useState(false);
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
  const [storeItems, setStoreItems] = useState([])
  const [articleTopics,setArticleTopics] = useState([]);
  const [Goals, setGoals] = useState([]);
  const [button1Clicked, setButton1Clicked] = useState(false);
  const [button2Clicked, setButton2Clicked] = useState(false);
  const [button3Clicked, setButton3Clicked] = useState(false);
  const [button4Clicked, setButton4Clicked] = useState(false);
  const [button5Clicked, setButton5Clicked] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartContent, setCartContent] = useState([]);
    useEffect(() => {
      localStorage.setItem('recFriends', JSON.stringify(recFriends));
      
    }, [recFriends]);
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/get_cart/', {params:{CustomerId:user.CustomerId}});
        console.log(response.data)
        const cartData=response.data[0]
        setCart(cartData)
        setCartDataFetched(true);
        

      }
      catch (error) {
        console.error('Error fetching cart:', error);
        }
      }
    useEffect(() => {

        fetchCart();
      }
      ,[]);
      const cartQuantity = () => {
        // let quantity = 0;
        // console.log(cart)
        // console.log(cart.inCart)
        // if (cartDataFetched) {
        //   cart.inCart.map((item) => {
        //     const data = {
        //       cart: cart.cartId,
        //       product: item,
        //     };
        //     const fetchCartItems = async (data) => {
        //       const response = await axios.get('http://127.0.0.1:8000/api/get_cart_items/', {params:data,});
        //       console.log(response.data[0].quantity)
        //       // response.then(response => {
        //       //   const cartItems = response.data;
        //       //   console.log(cartItems[0].quantity)
        //       //   return cartItems[0].quantity;
        //       // });
        //       return response.data[0].quantity;
        //     }
        //     let add=fetchCartItems(data);
        //     quantity += add;
        //   });
        // }
        // console.log(quantity)
        // return quantity;
        // return (cart.inCart.length);
        let quantity = 0;
        cartContent.map((item) => {
          quantity += item.quantity;
        }
        );
        return quantity;
      };
    return (
      <AppContext.Provider value={{ isSidebarExpanded, setIsSidebarExpanded ,recFriends,setRecFriends, storeItems,cart, setCart,articleTopics,setArticleTopics,Goals,setGoals,fetchCart,
        button1Clicked, setButton1Clicked,button2Clicked, setButton2Clicked,button3Clicked, setButton3Clicked,button4Clicked, setButton4Clicked,button5Clicked, setButton5Clicked,setStoreItems,
        user, setUser,cartDataFetched, setCartDataFetched,cartContent, setCartContent,cartQuantity
      }}>
        {children}
      </AppContext.Provider>
    );
  };


export const useGlobalContext=()=>{
    return useContext(AppContext);

}
export {AppContext,AppProvider};