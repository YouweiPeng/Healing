import {motion} from 'framer-motion';
import SideBar from '../components/sideBar';
import { useGlobalContext } from '../context';
import axios from "axios";
import PageHomeButton from '../components/PageHomeButton';
import {BsCartPlus} from 'react-icons/bs';
import{CiShoppingCart} from 'react-icons/ci';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const StorePage = () => {
  const navigate = useNavigate();
  const {isSidebarExpanded, setIsSidebarExpanded} = useGlobalContext();
  const {user} = useGlobalContext();
  const{storeItems,setStoreItems} = useGlobalContext();
  const {cart, setCart,fetchCart,cartQuantity}= useGlobalContext();
  const {cartDataFetched }= useGlobalContext();
  const {cartContent, setCartContent} = useGlobalContext();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products/');
        const productsData = response.data;
        setStoreItems(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
        fetchCart()
      }
      ,[]);

  const handleCartButton = () => {
    navigate('/checkOutPage');
  }


  const handleAddtoCart = async (event) => {
    const productId = parseInt(event.currentTarget.id);
    const cartId = cart.cartId;

    const data1 = {
      cartId: cartId,
      product: productId,
    }
    const response = await axios.get('http://127.0.0.1:8000/api/get_cart_items/', {params:data1,});
    console.log(response.data)





    if (response.data.length >0) {
      const data2 = {
        cartId: cartId,
        product: productId,
        quantity: response.data[0].quantity + 1
      };
      try {
        const response = await axios.patch('http://127.0.0.1:8000/api/update_cart_items/',data2);
        console.log(response)
        const newCartContent = [...cartContent]
        newCartContent.map((item) => {
          console.log(item.product)
          if (item.product === data2.product) {
            console.log("item matched")
            item.quantity = item.quantity + 1;
          }
        })
        setCart({ ...cart, inCart: [...cart.inCart, response.data] });
        setCartContent(newCartContent)
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    } 






    else {
      console.log("else triggered")
      const data = {
        cartId: cart.cartId,
        product: productId,
        quantity: 1
      };

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/add_to_cart/', data);
        console.log(response.data)
        setCart({ ...cart, inCart: [...cart.inCart, response.data] });
        setCartContent([...cartContent, response.data])
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
  };








  useEffect(() => {
    const data ={
      cartId: cart.cartId,
    }
    const fetchCartItems = async (data) => {
    try{
    const responses = await axios.get('http://127.0.0.1:8000/api/get_cart_items_by_cart/', {params:data,});
    console.log(responses.data)
    setCartContent(responses.data);
  }
    catch (error) {
      console.error('Error adding to cart:', error);
    }
  }
  fetchCartItems(data);
  }, []);
  
  console.log(cartContent)
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
      
      <div className="container-store" style={{ marginLeft: isSidebarExpanded ? '200px' : '90px' , position:'relative'}}>
      
      <div className='store-header'style={{left:isSidebarExpanded?'200px' : '90px'}}>
        <div>
        <h1 className='header-text'>Online Store </h1>
        </div>

        <div>
        <button className='cart-button' onClick={handleCartButton}>
              <CiShoppingCart/>
              <div className="cart-quantity js-cart-quantity">
                {cartQuantity()}

            </div>

            </button> 
            <PageHomeButton/>
        </div>

           
          
        </div>
        <section className="section-center">
        {
          storeItems.map((item)=>{
            const{id,name,image,price} = item;
            return(               
              <article key={id} className="singleItem" >
                <img src={`/images/${image}`} className="testImg" alt={name} />
                
                <footer>
                  <h4>{name}</h4>
                  <h5 className="price">${price/100}</h5>
                </footer>
                <button className="like-btn" key={id} id={id} onClick={handleAddtoCart}>
                  <BsCartPlus/>
                </button>
  
              </article>
              )

          
        })
      }
      </section>
        <SideBar/>
      </div>
      </motion.div>
    );
  };
  
  export default StorePage;