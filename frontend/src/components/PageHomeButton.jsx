import { useNavigate } from "react-router-dom";
import {AiOutlineHome} from 'react-icons/ai';
const PageHomeButton = () => {
    const navigate = useNavigate();
    const handleHomeButton = () => {
            navigate('/');
        };
    
    return (
        <button onClick={handleHomeButton} className="page-home-button" style={{position:'absolute', top:'5px', right:'5px', fontSize:'20px', border:'none', cursor:'pointer',backgroundColor:'transparent'}}> <AiOutlineHome/></button>
    );
}
  
  export default PageHomeButton;