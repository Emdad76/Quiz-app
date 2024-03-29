import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from "../components/Button";
import Form from '../components/Form';
import Info from "../components/Info";
/* import classes from '../styles/Login.module.css'; */
import TextInput from "../components/TextInput";
import { useAuth } from '../contexts/AuthContext';


export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const { login } = useAuth();
    const navigate = useNavigate();

    async function submitHandler(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(email, password);
            navigate("/")

        } catch (err) {
            console.log(err);
            setLoading(false);
            setError('Failed to login ')
        }
    }

    return (
        <Form style={{ height: "330px" }} onSubmit={submitHandler}>
            <TextInput type="text" placeholder="Enter email" icon="alternate_email" required value={email} onChange={(e) => setEmail(e.target.value)} />

            <TextInput type="password" placeholder="Enter password" icon="alternate_email" required value={password} onChange={(e) => setPassword(e.target.value)} />

            <Button type="submit" disabled={loading} > <span>Submit now </span></Button>

            {error && (<p className="error">{error}</p>)}
            <Info>
                Don't have an account? <Link to="/signup">Signup</Link> instead.
            </Info>
        </Form>
    );
}