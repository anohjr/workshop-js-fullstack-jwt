import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Nav from "./components/Nav/Nav";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import {useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import { login } from "./store/auth";
import { getCurrentUser } from "./services/users";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    reloadStore();
  }, []);

  const reloadStore = async () => {
    try {
      const result = await getCurrentUser();
      dispatch(login(result.data));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Router>
      <div className='app'>
        <Nav />
        <Routes>
            <Route exact path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route exact path='/login' element={<PublicRoute><Login /></PublicRoute>} />
            <Route exact path='/forgotPassword' element={<PublicRoute><ForgotPassword /></PublicRoute>} />
            <Route exact path='/resetPassword' element={<PublicRoute><ResetPassword /></PublicRoute>} />
            <Route exact path='/users' element={<PrivateRoute role="ROLE_ADMIN"><Users /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

const roles = [
  "ROLE_USER",
  "ROLE_ADMIN"
];

const PrivateRoute = ({children, role = "ROLE_USER"}) => {
  const auth = useSelector((state) => state.auth);
  if (auth.isLogged) {
    if (auth.user?.role == role || roles.indexOf(auth.user?.role) >= roles.indexOf(role))
      return children;
    else
      return <Navigate to="/" />
  }
  else
    return <Navigate to="/login" />
}

const PublicRoute = ({children}) => {
  const auth = useSelector((state) => state.auth);
  if (!auth.isLogged) {
    return children;
  }
  else
    return <Navigate to="/" />
}

export default App;