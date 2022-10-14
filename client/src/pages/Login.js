import axios from 'axios';
import React from 'react'
import { useState, useContext } from "react"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../help/AuthContext';


function Login() {
    const [usernam, setUsernam] = useState('');
    const [password, setPassword] = useState('');
    const { setAuthState, authState } = useContext(AuthContext)
    let navigate = useNavigate()
    const login = () => {
        const data = { username: usernam, password: password }
        axios.post('http://localhost:3001/auth/login', data).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                localStorage.setItem("accessToken", response.data);
                navigate("/");
                setAuthState({
                    username: response.data.username,
                    id: response.data.id,
                    status: true
                });
            }
        })
    }
    return (
        <div>
            <h1>Login Page</h1>
            <div className="formulaireG">
                <label >Full name</label>
                <input name='user' type="text" id="inputCreatPos" placeholder="... Jony Deb" value={usernam} onChange={(e) => { setUsernam(e.target.value) }} />
                <br />
                <label>Password</label>
                <input name='pass' placeholder=".........." type="password" id="inputCreatPos" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <button onClick={login}>Login</button>
            </div>
        </div>
    )
}

export default Login
