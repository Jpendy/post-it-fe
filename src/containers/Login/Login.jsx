import React, { useState } from 'react'
import { useLogin, useAuthError } from '../../hooks/AuthContext';
import './Login.css'

export default function Login() {
    const login = useLogin();
    const error = useAuthError();

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const handleSubmit = e => {
        e.preventDefault()
        login(email, password)
    }

    return (
        <div className='login-area'>
            <img src='/postr-logo2.png' alt='' />
            <form onSubmit={handleSubmit} >
                {error && <p style={{ color: 'red' }} >{`${error.error}`}</p>}
                <input placeholder='username' onChange={({ target }) => setEmail(target.value)} />
                <input placeholder='password' onChange={({ target }) => setPassword(target.value)} />
                <button>submit</button>
            </form>
        </div>
    )
}
