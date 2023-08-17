import {FiLogOut} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
const AdminLogout = () => {
    const navigate = useNavigate();
    const handleAdminLogout = () => {
        navigate('/');
    };
    
    return(
    <FiLogOut 
    
    onClick={handleAdminLogout}
    className='admin-logout'
    />
    );
}

export default AdminLogout;