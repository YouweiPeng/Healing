import {motion} from 'framer-motion';
import HomeButton from '../components/HomeButton';
import SideBar from '../components/sideBar';
import { useGlobalContext } from '../context';
import PageHomeButton from '../components/PageHomeButton';
const GuidePage = () => {
  const {isSidebarExpanded, setIsSidebarExpanded} = useGlobalContext();
  const{button1Clicked, setButton1Clicked,button2Clicked, setButton2Clicked,button3Clicked, setButton3Clicked,button4Clicked, setButton4Clicked,button5Clicked, setButton5Clicked} = useGlobalContext();
  const selects =()=>{
    const arr=[]
    if(button1Clicked){
      arr.push('Improve sleep quality')
    }
    if(button2Clicked){
      arr.push('Reduce stress or anxiety')
    }
    if(button3Clicked){
      arr.push('Improve focus')
    }
    if(button4Clicked){
      arr.push('Self-improvement')
    }
    if(button5Clicked){
      arr.push('Something else')
    }
    return arr.join(', ');
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
      <div className="container" style={{ marginLeft: isSidebarExpanded ? '200px' : '90px' }}>
        <h2 style={{marginTop:'30px'}}>You selected {selects()}</h2>
        <h2>But we are still working on the guide steps for specific needs for user</h2>
        <img className='still-working' src="../images/comming.jpg" />
        <PageHomeButton/>
        <SideBar/>
      </div>
      </motion.div>
    );
  };
  
  export default GuidePage;