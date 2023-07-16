import Ali from '../images/Ali.jpg';
import { useNavigate } from 'react-router-dom';
import HomeButton from '../components/HomeButton';
const SupportPage = () => {
    const navigate = useNavigate();
    return (
      <div className="support-container" style={{position:'relative'}}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
        <h1>Thanks! ^ ^ Your support is greatly appreciated!
        
        </h1>
        <HomeButton/>
        </div>

        
        <img src={Ali} style={{height:'688px'}}/>
        
      </div>
    );
  };
  
  export default SupportPage;