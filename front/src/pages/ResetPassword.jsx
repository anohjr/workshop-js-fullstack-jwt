import { useState } from "react";
import Input from "../components/Input";
import { resetPassword } from "../services/auth";
import { useNavigate, useSearchParams } from "react-router-dom";

function ResetPassword() {

    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [params, setParams] = useSearchParams();
    const token = params.get("token");

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(password, token);
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <Input type="password" value={password} setValue={setPassword} />
                <Input type="submit" value="Reinitialiser mon mot de passe" setValue="" />
            </form>
        </>
    );
}

export default ResetPassword;