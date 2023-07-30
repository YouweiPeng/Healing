import { useNavigate } from "react-router-dom";
import {AiOutlineHome} from 'react-icons/ai';
import { useGlobalContext } from "../context";
const PageHomeButton = () => {
    const navigate = useNavigate();
    const{button1Clicked, setButton1Clicked,button2Clicked, setButton2Clicked,button3Clicked, setButton3Clicked,button4Clicked, setButton4Clicked,button5Clicked, setButton5Clicked} = useGlobalContext();
    const handleHomeButton = () => {
        setButton1Clicked(false);
        setButton2Clicked(false);
        setButton3Clicked(false);
        setButton4Clicked(false);
        setButton5Clicked(false);
            navigate('/MainPage');
        };
    
    return (
        <button onClick={handleHomeButton} className="page-home-button" style={{position:'absolute', top:'5px', right:'5px', fontSize:'20px', border:'none', cursor:'pointer',backgroundColor:'transparent'}}> <AiOutlineHome/></button>
    );
}
  
  export default PageHomeButton;