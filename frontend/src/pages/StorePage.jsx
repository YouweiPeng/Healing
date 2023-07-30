import {motion} from 'framer-motion';
import SideBar from '../components/sideBar';
import { useGlobalContext } from '../context';
import axios from "axios";
import PageHomeButton from '../components/PageHomeButton';
import {BsCartPlus} from 'react-icons/bs';
import{CiShoppingCart} from 'react-icons/ci';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const StorePage = () => {
  const navigate = useNavigate();
  const {isSidebarExpanded, setIsSidebarExpanded} = useGlobalContext();
  const{storeItems,setStoreItems} = useGlobalContext();
  const {cart, setCart}= useGlobalContext();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products/');
        const productsData = response.data;
        console.log(productsData);
        setStoreItems(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const cartQuantity = () => {
    let quantity = 0;
    cart.forEach((item) => {
      quantity += item.quantity;
    });
    return quantity;
  }
  const handleCartButton = () => {
    navigate('/checkOutPage');
  }
  const handleAddtoCart = (event) => {
    const newCart=[...cart]
    storeItems.map((item)=>{
      if(item.id === parseInt(event.currentTarget.id)){
        const {id,name,price}=item;
        let match=false
        newCart.forEach(element => {
          if(element.id === id){
            element.quantity += 1;
            match=true;
          }
        });
        if(!match){
          newCart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
          });
      }
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
      
      <div className="container-store" style={{ marginLeft: isSidebarExpanded ? '200px' : '90px' , position:'relative'}}>
      
      <div className='store-header'style={{left:isSidebarExpanded?'200px' : '90px'}}>
        <div>
        <h1 className='header-text'>Online Store </h1>
        </div>

        <div>
        <button className='cart-button' onClick={handleCartButton}>
              <CiShoppingCart/>
                <div className="cart-quantity js-cart-quantity">{cartQuantity()}</div>

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