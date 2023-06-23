import { useState } from "react";
import Input from "../components/Input";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import useStore from "../store";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const {auth, setAuth} = useStore();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await login(email, password);
            setAuth({user: result.data, isLogged: true});
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
        </>
    );
}

export default Login;