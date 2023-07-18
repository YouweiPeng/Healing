import {motion} from 'framer-motion';
import SideBar from '../components/sideBar';
import { useGlobalContext } from '../context';
import PageHomeButton from '../components/PageHomeButton';
const ContactUsPage = () => {
  const {isSidebarExpanded, setIsSidebarExpanded} = useGlobalContext();
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
      <div className="container" style={{ marginLeft: isSidebarExpanded ? '200px' : '90px' , position:'relative' }}>
      <PageHomeButton/>
        <h1>Contact Us Page</h1>
        <SideBar/>
      </div>
      </motion.div>
    );
  };
  
  export default ContactUsPage;