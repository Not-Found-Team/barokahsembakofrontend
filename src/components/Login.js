import axios from 'axios';
import React, { useState } from 'react'
import { Form, Alert } from "react-bootstrap";
import { Uri } from '../Uri';
import { useNavigate } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        // // Perform login logic here
        // console.log('Username:', username);
        // console.log('Password:', password);
        console.log(Uri.rootUri)

        try {
            const res = await axios.post(`${Uri.rootUri}/login`, { username: username, password: password });
            localStorage.setItem("user", JSON.stringify(res.data.body.item))
            navigate("/Index");
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.status == 401) {
                setErrorMsg(error?.response?.data?.message);
                setIsError(true);
                setTimeout(() => {
                    setIsError(false);
                    setErrorMsg("");
                }, 3000);
            }

        }
        // Reset form
        setUsername('');
        setPassword('');
    };

    return (
        <div className="container">
            {isError &&
                <Alert variant="danger">
                    {errorMsg}
                </Alert>
            }
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Login