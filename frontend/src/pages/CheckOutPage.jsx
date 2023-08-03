import { motion } from 'framer-motion';
import { useGlobalContext } from '../context';
import PageHomeButton from '../components/PageHomeButton';
import SideBar from '../components/sideBar';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CheckOutPage = () => {
  const { isSidebarExpanded } = useGlobalContext();
  const { cart, setCart, cartContent, setCartContent, cartQuantity } = useGlobalContext();
  const [cartContentWithPrice, setCartContentWithPrice] = useState([]);
  console.log(cart)
  useEffect(() => {
    const fetchPrice = async () => {
      const newCartContentWithPrice = await Promise.all(
        cartContent.map(async (item) => {
          const data = {
            productId: item.product,
          };
          const response = await axios.get(`http://127.0.0.1:8000/api/product/${item.product}`);
          const instance = {
            product: item.product,
            name: response.data.name,
            price: response.data.price,
            quantity: item.quantity,
          };
          return instance;
        })
      );
      
      setCartContentWithPrice(newCartContentWithPrice);
    };

    fetchPrice();
  }, [cartContent]);

  const handleDeleteButton = (event) => {
    const newCartContent = cartContent.filter(item => item.product !== parseInt(event.currentTarget.id));
    setCartContent(newCartContent);
    const p_id=parseInt(event.currentTarget.id);
    const delete_cart_item = async (p_id) => {
      const data = {
        cartId: cart.cartId,
        product: p_id,
      };
      const response = await axios.delete('http://127.0.0.1:8000/api/delete_cart_item/', { params: data });
    }
    delete_cart_item(p_id);
  };

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
      <div className="container" style={{ marginLeft: isSidebarExpanded ? '200px' : '90px', position: 'relative' }}>
        <PageHomeButton />
        <h1>Checkout</h1>
        <div className='checkOut-div'>
          <div className='item-display'>
            {cartContentWithPrice.map((item) => (
              <div className='item-div' key={item.product}>
                <div className='item-info'>
                  <h3>Item: {item.name}</h3>
                  <h4>Quantity: {item.quantity}</h4>
                  <div className='Unit-price-div'>
                    <h5>Unit price: ${item.price / 100}</h5>
                    <button className='cart-delete-button' id={item.product} onClick={handleDeleteButton}> Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='calculate-price'>
            <h3>Order summary:</h3>
            <h4>items({cartQuantity()}) </h4>
            <h4>Total before tax: ${cartContentWithPrice.reduce((acc, item) => acc + item.price * item.quantity, 0) / 100}</h4>
            <h4>Estimated tax (13%): ${(cartContentWithPrice.reduce((acc, item) => acc + item.price * item.quantity, 0) * 13 / 10000).toFixed(2)}</h4>
            <h4 style={{ color: 'rgb(177, 39, 4)' }}>Order total: ${(cartContentWithPrice.reduce((acc, item) => acc + item.price * item.quantity, 0) * 113 / 10000).toFixed(2)}</h4>
            <button className='place-order-button'>Place your order</button>
          </div>
        </div>
        <SideBar />
      </div>
    </motion.div>
  );
};

export default CheckOutPage;
