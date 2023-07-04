import { useState } from "react";
import Input from "../components/Input";
import authService from "../services/auth";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import { login } from "../store/auth";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await authService.login(email, password);
            dispatch(login(result.data));
            navigate("/");
        } catch (error) {
            if (error.response.status == 400)
                setError("email ou mot de passe incorrect");
        }
    }


    return (
        <>
        {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <Input type="email" value={email} setValue={setEmail} />
                <Input type="password" value={password} setValue={setPassword} />
                <Input type="submit" value="Se connecter" setValue="" />
            </form>
            <button onClick={() => navigate("/forgotPassword")}>J'ai oublier mon mot de passe ?</button>
        </>
    );
}

export default Login;