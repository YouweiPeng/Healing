import { useNavigate } from "react-router-dom";
const HomeButton = () => {
    const navigate = useNavigate();
    const handleHomeButton = () => {
            navigate('/');
        };
    
    return (
        <div className="container">
        <button onClick={handleHomeButton} className="home-button"> Back Home</button>
        </div>
    );
}
  
  export default HomeButton;