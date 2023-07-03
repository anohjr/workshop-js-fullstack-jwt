import { useState } from "react";
import Input from "../components/Input";
import { sendResetPassword } from "../services/auth";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendResetPassword(email);
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <Input type="email" value={email} setValue={setEmail} />
                <Input type="submit" value="Envoyer une demande de reinitialisation" setValue="" />
            </form>
        </>
    );
}

export default ForgotPassword;