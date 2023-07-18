import {motion} from 'framer-motion';
import SideBar from '../components/sideBar';
import { useGlobalContext } from '../context';
import PageHomeButton from '../components/PageHomeButton';

const CheckOutPage = () => {
    const cartQuantity = () => {
        let quantity = 0;
        cart.forEach((item) => {
          quantity += item.quantity;
        });
        return quantity;
      }
  const {isSidebarExpanded, setIsSidebarExpanded} = useGlobalContext();
  const {cart, setCart}= useGlobalContext();
  const handleDeleteButton = (event) => {
    const newCart=[...cart]
    newCart.map((item)=>{
        if(item.id === parseInt(event.currentTarget.id)){
            const index = newCart.indexOf(item);
            newCart.splice(index,1);
        }
        })
        setCart(newCart);
    }
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

      <div className="container" style={{ marginLeft: isSidebarExpanded ? '200px' : '90px' , position:'relative'}}>
      <PageHomeButton/>
        <h1>Checkout</h1>
        <div className='checkOut-div'>
        <div className='item-display'>
        {
            cart.map((item)=>{
                return(
                    <div className='item-div'>
                        <div className='item-info'>
                            <h3>Item: {item.name}</h3>
                            <h4>Quantity: {item.quantity}</h4>
                            <div className='Unit-price-div'><h5>Unit price: ${item.price/100}</h5>
                            <button className='cart-delete-button' id={item.id} onClick={handleDeleteButton}> Delete</button></div>
                            
                        </div>
                    </div>
                )
            })
        }
        
                <div className='calculate-price'>
                    <h3>Order summary:</h3>
                    <h4>items({cartQuantity()}) </h4>
            <h4>Total before tax: ${cart.reduce((acc, item)=>{return acc+item.price*item.quantity},0)/100}</h4>
            <h4>Estimated tax (13%): ${(cart.reduce((acc, item)=>{return acc+item.price*item.quantity},0)*13/10000).toFixed(2)}</h4>
            <h4 style={{color: 'rgb(177, 39, 4)'}}>Order total: ${(cart.reduce((acc, item)=>{return acc+item.price*item.quantity},0)*113/10000).toFixed(2)}</h4>
        </div>
        </div>

        </div>
        <SideBar/>
      </div>
      </motion.div>
    );
  };
  
  export default CheckOutPage;