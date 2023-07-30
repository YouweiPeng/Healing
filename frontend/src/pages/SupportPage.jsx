// import Ali from '../images/Ali.jpg';
import { useNavigate } from 'react-router-dom';
import HomeButton from '../components/HomeButton';
import {motion} from 'framer-motion';
import SideBar from '../components/sideBar';
const SupportPage = () => {
  
    const navigate = useNavigate();
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
      <div className="support-container" style={{position:'relative'}}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
        <h1>Thanks! ^ ^ Your support is greatly appreciated!
        
        </h1>
        <HomeButton/>
        </div>

        
        <img src="/images/Ali.jpg" style={{height:'688px'}}/>
        
      </div>
      </motion.div>
    );
  };
  
  export default SupportPage;