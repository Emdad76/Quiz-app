import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import Form from '../components/Form';
import Info from '../components/Info';
import TextInput from '../components/TextInput';
import { useAuth } from '../contexts/AuthContext';


export default function SignupForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agree, setAgree] = useState("");
    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const { signup } = useAuth();

    const navigate = useNavigate()


    async function submitHandler(e) {
        e.preventDefault();
        //do validation 
        if (password !== confirmPassword) {
            return setError("Password don't macth");
        }

        try {
            setError("");
            setLoading(true);
            await signup(email, password, username);
            // navigate home page
            navigate("/")

        } catch (err) {
            console.log(err);
            setLoading(false)
            setError(" failed to create an account")
        }
    }


    return (
        <Form style={{ height: '500px' }} onSubmit={submitHandler} >
            <TextInput type="text" placeholder="Enter name" icon="person" required value={username} onChange={(e) => setUsername(e.target.value)} />

            <TextInput type="text" placeholder="Enter email" icon=" alternate_email" required value={email} onChange={(e) => setEmail(e.target.value)} />

            <TextInput type="password" placeholder="Enter password" icon="lock" required value={password} onChange={(e) => setPassword(e.target.value)} />

            <TextInput type="password" placeholder="Confirm password" icon="lock_clock" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

            <Checkbox text=" I agree to the Terms &amp; Conditions" required value={agree} onChange={(e) => setAgree(e.target.value)} />

            <Button type="submit" disabled={loading}><span> Submit now </span></Button>

            {error && <p className="error">{error}</p>}
            <Info>
                Already have an account? <Link to="/login">Login</Link> instead.
            </Info>
        </Form>
    );
}