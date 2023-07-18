import {motion} from 'framer-motion';
import HomeButton from '../components/HomeButton';
import SideBar from '../components/sideBar';
import { useGlobalContext } from '../context';
const GuidePage = () => {
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
      <div className="container" style={{ marginLeft: isSidebarExpanded ? '200px' : '90px' }}>
        <h1>Still working on the guide steps for specific needs for user</h1>
        <HomeButton/>
        <SideBar/>
      </div>
      </motion.div>
    );
  };
  
  export default GuidePage;