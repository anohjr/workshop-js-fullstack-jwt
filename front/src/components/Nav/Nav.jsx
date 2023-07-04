import "./Nav.css";
import { Link } from "react-router-dom";
import authService from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/auth";
import {useSelector, useDispatch} from "react-redux";

const Navbar = () => {

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try {
            await authService.logout();
            dispatch(logout());
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <header className='navbar'>
            {auth.isLogged && 
            <div className='navbar__title navbar__item'><Link to="/">My panel</Link></div>
            }
            <div className='navbar__item'><Link to="/albums">Albums</Link></div>
            <div className='navbar__item'><Link to="/tracks">Tracks</Link></div>
            {auth.user?.role == "ROLE_ADMIN"  && 
                <div className='navbar__item'><Link to="/users">Users</Link></div>
            }
            {!auth.isLogged && <div className='navbar__item'><Link to="/login">Login</Link></div>}
            {auth.isLogged && <div className='navbar__item' onClick={handleSubmit}>Logout</div>}
        </header>
    )
};

export default Navbar;