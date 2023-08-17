import AdminLogout from '../components/AdminLogout';
import {BiPurchaseTagAlt} from 'react-icons/bi';
import {FaLaptopMedical} from 'react-icons/fa';
import {FaStore} from 'react-icons/fa';
import {RiArticleLine} from 'react-icons/ri';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {FiMoon} from 'react-icons/fi'; 
import {BsSun} from 'react-icons/bs';
import axios from 'axios';
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useGlobalContext } from '../context';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const AdminDashboard = () => {
    const [showOrdersModal_admin, setShowOrdersModal_admin] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const themeClass = isDarkTheme ? 'dark-theme' : 'light-theme';
    const [allUserOrders, setAllUserOrders] = useState([]);
    const [allAppointments, setAllAppointments] = useState([]);
    const handleCloseOrdersModal_admin = () => setShowOrdersModal_admin(false);
    const handleOpenOrdersModal_admin = () => setShowOrdersModal_admin(true);
    const [showReservationsModal_admin, setShowReservationsModal_admin] = useState(false);
    const handleCloseReservationsModal_admin = () => setShowReservationsModal_admin(false);
    const handleOpenReservationsModal_admin = () => setShowReservationsModal_admin(true);
    const{storeItems,setStoreItems} = useGlobalContext();
    const [showUpdateStoreModal_admin, setShowUpdateStoreModal_admin] = useState(false);
    const handleCloseUpdateStoreModal_admin = () => setShowUpdateStoreModal_admin(false);
    const handleOpenUpdateStoreModal_admin = () => setShowUpdateStoreModal_admin(true);
    const [showAddProductDialog, setShowAddProductDialog] = useState(false);
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productStock, setProductStock] = useState("");
    const { articleTopics, setArticleTopics } = useGlobalContext();
    const [showArticleModal_admin, setShowArticleModal_admin] = useState(false);
    const [showAddArticleDialog, setShowAddArticleDialog] = useState(false);
    const [newArticle, setNewArticle] = useState({
        title: "",
        content: "",
        author: "",
      });

    const handleCloseArticleModal_admin = () => {
      setShowArticleModal_admin(false);
    };
    const handleOpenAddArticleDialog = () => {
        setShowAddArticleDialog(true);
      };
      const handleCloseAddArticleDialog = () => {
        setNewArticle({
            title: "",
            content: "",
            author: "",
          });
        setShowAddArticleDialog(false);
      };
      const handleAddArticle = async() => {
        const data = {
            title: newArticle.title,
            content: newArticle.content,
            author: newArticle.author,
            };
            try{
            const response = await axios.post('http://127.0.0.1:8000/api/create_article/', data);
            const newArticletopics=[...articleTopics];
            newArticletopics.push(response.data);
            setArticleTopics(newArticletopics);
            }
            catch (error) {
                console.log(error);
            }
            
        setNewArticle({
            title: "",
            content: "",
            author: ""
        });
        setShowAddArticleDialog(false);
        handleCloseAddArticleDialog();
      };
    const handleOpenArticleModal_admin = () => {
      setShowArticleModal_admin(true);
    };
    const handleOpenAddProductDialog = () => {
        setShowAddProductDialog(true);
      };
      const handleAddProduct = async() => {
        const newProduct = {
            name: productName,
            price: productPrice*100,
            description: productDescription,
            stock: productStock,
            };
            try{
            const response = await axios.post('http://127.0.0.1:8000/api/create_product/', newProduct);
            console.log(response.data);
            const newStoreItems = [...storeItems];
            newStoreItems.push(response.data);
            setStoreItems(newStoreItems);
            }
            catch (error) {
                console.log(error);
            }
        setProductName("");
        setProductPrice("");
        setProductDescription("");
        setProductStock("");
        setShowAddProductDialog(false);
      };
      const handleDeleteArticle = async (event) => {
        const articleId = parseInt(event.currentTarget.id);
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/delete_article/${articleId}`);
        }
        catch (error) {
            console.log(error);
        }
        const newArticletopics=[...articleTopics];
        const index = newArticletopics.findIndex((item) => item.id === articleId);
        newArticletopics.splice(index, 1);
        setArticleTopics(newArticletopics);
        
    };

      const handleCloseAddProductDialog = () => {
        setProductName("");
        setProductPrice("");
        setProductDescription("");
        setProductStock("");
        setShowAddProductDialog(false);
      };
      
    const handleDeleteProduct = async (event) => {
        const productId = parseInt(event.currentTarget.id);
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/delete_product/${productId}/`);
            console.log(response.data);
            const newStoreItems = [...storeItems];
            const index = newStoreItems.findIndex((item) => item.id === productId);
            newStoreItems.splice(index, 1);
            setStoreItems(newStoreItems);
        }
        catch (error) {
            console.log(error);
        }
    };

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/get_appointment_all/');
            console.log(response.data);
            setAllAppointments(response.data);
        }
        catch (error) {
            console.log(error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      };
  
      const sortedUserOrders = allUserOrders.slice().sort((a, b) => {
        return new Date(a.order.orderDate) - new Date(b.order.orderDate);
      });
    const toggleTheme = () => {
      setIsDarkTheme((prevTheme) => !prevTheme);
    };
    const fetchOrders= async () => {
        const orderData=[]
        try {
          
          const response = await axios.get('http://127.0.0.1:8000/api/get_order_all/');
          response.data.map((order) => {
              const fetchOrderItems = async () => {
                const response2 = await axios.get('http://127.0.0.1:8000/api/get_orderItem/', {params:{orderId:order.id}});
                const response3 = await axios.get('http://127.0.0.1:8000/api/get_customer_by_id/', {params:{CustomerId:order.CustomerId}});
                orderData.push({order:order,orderItems:response2.data, name:response3.data.firstname})
              }
              fetchOrderItems();
            })
        
        }
        catch (error) {
          console.error('Error fetching orders:', error);
          }
        setAllUserOrders(orderData);
        }
    const fetchArticles = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/get_articles/');
            console.log(response.data);
            const data = response.data;
            setArticleTopics(data);
        } catch (error) {
            console.log(error);
        }
        };

        useEffect(() => {
        fetchArticles();
        }, []);
useEffect(() => {
    fetchOrders();
    }
    ,[]);

useEffect(() => {
    fetchAppointments();
    }
    ,[]);
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
    console.log(storeItems);
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
        <div className={themeClass}>
            <h1>Admin Dashboard</h1>
                    {isDarkTheme ? <FiMoon onClick={toggleTheme} style={{fontSize:"50px",position:'absolute', top:'20px',left:'40px'}}/> : <BsSun onClick={toggleTheme}
                    style={{fontSize:"50px",position:'absolute', top:'20px',left:'40px'}}
                    />}
            <AdminLogout />
            <div className='container'>
                    <div className='admin-dash-grid'>
                    <div className='admin-options' onClick={handleOpenOrdersModal_admin}>
                    <BiPurchaseTagAlt className='mr-3'
                        style={{fontSize: '80px', display:'inline-block'}}
                        />
                        <h2 style={{display:"inline-block"}}>Check Orders</h2>

                    </div>
                    <div className='admin-options' onClick={handleOpenReservationsModal_admin}>
                    <FaLaptopMedical className='mr-3'
                        style={{fontSize: '80px', display:'inline-block'}}
                        />
                        <h2 style={{display:"inline-block"}}>Check Reservations</h2>

                    </div>
                    <div className='admin-options' onClick={handleOpenUpdateStoreModal_admin}>
                    <FaStore className='mr-3'
                        style={{fontSize: '80px', display:'inline-block'}}
                        />
                        <h2 style={{display:"inline-block"}}>Update store</h2>

                    </div>
                    <div className='admin-options' onClick={handleOpenArticleModal_admin}>
                    <RiArticleLine className='mr-3'
                        style={{fontSize: '80px', display:'inline-block'}}
                        />
                        <h2 style={{display:"inline-block"}}>Update Articles</h2>

                    </div>
                    </div>
            </div>
        </div>
        <Modal
      open={showOrdersModal_admin}
      onClose={handleCloseOrdersModal_admin}
      aria-labelledby="orders-modal"
      aria-describedby="user-orders"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        
      }}
    >
      <Box
        sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: '50vw',
            maxHeight: '90vh',
            overflowY: 'auto', 
            bgcolor: isDarkTheme ? "#333" : "background.paper",
            color: isDarkTheme ? "WHITE" : "#333",
            boxShadow: 24,
            p: 4,
        }}
      >
        <Typography variant="h6" id="modal-modal-title">
          All Orders
        </Typography>
        {sortedUserOrders.map((orderData) => (
          <Paper
            key={orderData.order.id}
            elevation={3}
            style={{ padding: "10px", marginTop: "10px", backgroundColor: isDarkTheme ? "#333" : "WHITE", color: isDarkTheme ? "WHITE" : "#333" , border: isDarkTheme ? "1px solid WHITE" : ""}}
          >
            <Typography variant="body1">
              Order Date: {formatDate(orderData.order.orderDate)}
            </Typography>
            <Typography variant="body1">
              Total Price: ${orderData.order.totalPrice}
            </Typography>
            <Typography variant="body1">
              Customer: {orderData.name}
            </Typography>
            <ul>
              {orderData.orderItems.map((item) => (
                <li key={item.id}>
                  Product: {item.product}, Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </Paper>
        ))}
      </Box>
    </Modal>
            {/* Reservations Modal */}
            <Modal
                open={showReservationsModal_admin}
                onClose={handleCloseReservationsModal_admin}
                aria-labelledby="reservations-modal"
                aria-describedby="user-reservations"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: '50vw',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        bgcolor: isDarkTheme ? "#333" : "background.paper",
                        color: isDarkTheme ? "WHITE" : "#333",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" id="modal-modal-title">
                        All Reservations
                    </Typography>
                    {allAppointments.map((appointment) => (
                        <Paper
                            key={appointment.id}
                            elevation={3}
                            style={{ padding: "10px", marginTop: "10px", backgroundColor: isDarkTheme ? "#333" : "WHITE", color: isDarkTheme ? "WHITE" : "#333", border: isDarkTheme ? "1px solid WHITE" : "" }}
                        >
                            <Typography variant="body1">
                                Date: {formatDate(appointment.date)}
                            </Typography>
                            <Typography variant="body1">
                                Time: {appointment.time}
                            </Typography>
                            <Typography variant="body1">
                                Patient: {appointment.name}
                            </Typography>
                            <Typography variant="body1">
                                Problem: {appointment.problem}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            </Modal>
            <Modal
    open={showUpdateStoreModal_admin}
    onClose={handleCloseUpdateStoreModal_admin}
    aria-labelledby="update-store-modal"
    aria-describedby="update-store-items"
    style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }}
>
    <Box
        sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: '50vw',
            maxHeight: '90vh',
            overflowY: 'auto',
            bgcolor: isDarkTheme ? "#333" : "background.paper",
            color: isDarkTheme ? "WHITE" : "#333",
            boxShadow: 24,
            p: 4,
        }}
        
    >
         <Button variant="outlined"  style={{position:'absolute', top:'10px', right:'10px',backgroundColor: isDarkTheme ? "#333" : "WHITE", color: isDarkTheme ? "WHITE" : "#333",borderColor: isDarkTheme ? "WHITE" : "#333",}} onClick={handleOpenAddProductDialog}>Add product </Button>
        <Typography variant="h6" id="modal-modal-title">
            Update Store Items
        </Typography>
        {storeItems.map((item) => (
            <Paper
                key={item.id}
                elevation={3}
                style={{ padding: "10px", marginTop: "10px", backgroundColor: isDarkTheme ? "#333" : "WHITE", color: isDarkTheme ? "WHITE" : "#333", border: isDarkTheme ? "1px solid WHITE" : "" , position:'relative'}}
            >
                <Typography variant="body1">
                    Name: {item.name}
                </Typography>
                <Typography variant="body1">
                    Price: ${item.price/100}
                </Typography>
                <Typography variant="body1" >
                    Description: {item.description}
                </Typography>
                <IconButton aria-label="delete" size="large" style={{position:'absolute', top:'5px', right:'5px' ,color: isDarkTheme ? "WHITE" : "#333"}} id={item.id} onClick={handleDeleteProduct}>
                    <DeleteIcon />
                </IconButton>
                {/* ... (other item details) */}
            </Paper>
        ))}
    </Box>
</Modal>
<Dialog
  open={showAddProductDialog}
  onClose={handleCloseAddProductDialog}
  aria-labelledby="add-product-dialog"
  
>
  <DialogTitle>Add New Product</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Please enter the details of the new product.
    </DialogContentText>
    <TextField
      autoFocus
      margin="dense"
      label="Name"
      fullWidth
      value={productName}
      onChange={(e) => setProductName(e.target.value)}
    />
    <TextField
      margin="dense"
      label="Price"
      fullWidth
      value={productPrice}
      onChange={(e) => setProductPrice(e.target.value)}
    />
    <TextField
      margin="dense"
      label="Description"
      fullWidth
      value={productDescription}
      onChange={(e) => setProductDescription(e.target.value)}
    />
    <TextField
      margin="dense"
      label="Stock"
      fullWidth
      value={productStock}
      onChange={(e) => setProductStock(e.target.value)}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseAddProductDialog}>Cancel</Button>
    <Button onClick={handleAddProduct}>Add</Button>
  </DialogActions>
</Dialog>
<Modal
        open={showArticleModal_admin}
        onClose={handleCloseArticleModal_admin}
        aria-labelledby="article-modal"
        aria-describedby="article-details"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: '50vw',
            maxHeight: '90vh',
            overflowY: 'auto',
            bgcolor: isDarkTheme ? "#333" : "background.paper",
            color: isDarkTheme ? "WHITE" : "#333",
            boxShadow: 24,
            p: 4,
          }}
        >
            <Button variant="outlined"  style={{position:'absolute', top:'10px', right:'10px',backgroundColor: isDarkTheme ? "#333" : "WHITE", color: isDarkTheme ? "WHITE" : "#333",borderColor: isDarkTheme ? "WHITE" : "#333",}} onClick={handleOpenAddArticleDialog}>Add article </Button>
          <Typography variant="h6" id="modal-modal-title">
            Article Details
          </Typography>
          {articleTopics.map((article) => (
            <Paper
              key={article.id}
              elevation={3}
              style={{ padding: "10px", marginTop: "10px", backgroundColor: isDarkTheme ? "#333" : "WHITE", color: isDarkTheme ? "WHITE" : "#333", border: isDarkTheme ? "1px solid WHITE" : "" , position:'relative'}}
            >
              <Typography variant="body1">
                Title: {article.title}
              </Typography>
              <Typography variant="body1">
                Author: {article.author}
              </Typography>
              <Typography variant="body1">
                Publish Date: {formatDate(article.publishDate)}
              </Typography>
              <IconButton aria-label="delete" size="large" style={{position:'absolute', top:'5px', right:'5px' ,color: isDarkTheme ? "WHITE" : "#333"}} id={article.id} onClick={handleDeleteArticle}>
                    <DeleteIcon />
                </IconButton>
            </Paper>
          ))}
        </Box>
      </Modal>
      <Dialog
        open={showAddArticleDialog}
        onClose={handleCloseAddArticleDialog}
        aria-labelledby="add-article-dialog"
      >
        <DialogTitle>Add New Article</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={newArticle.title}
            onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Content"
            multiline
            rows={6}
            fullWidth
            value={newArticle.content}
            onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Author"
            fullWidth
            value={newArticle.author}
            onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddArticleDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddArticle} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
        </motion.div>
    );
}


export default AdminDashboard;