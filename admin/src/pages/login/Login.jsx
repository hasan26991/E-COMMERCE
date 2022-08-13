import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { LOGIN } from '../../redux/apiCalls'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        LOGIN(dispatch, { username, password });

    }

    return (
        <div
            style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', height: '100vh',
                flexDirection: 'column'
            }}>
            <input type='text' placeholder='username' onChange={(e) => setUsername(e.target.value)}></input>
            <input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}></input>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login