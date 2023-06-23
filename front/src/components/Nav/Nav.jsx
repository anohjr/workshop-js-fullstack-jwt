import "./Nav.css";
import { Link } from "react-router-dom";
import useStore from "../../store";
import { logout } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const {auth, setAuth} = useStore();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        await logout();
        setAuth({user: null, isLogged: false});
        navigate("/login");
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