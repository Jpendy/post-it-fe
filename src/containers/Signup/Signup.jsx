import React, { useState } from 'react'
import { useSignup, useAuthError } from '../../hooks/AuthContext'

export default function Signup() {
    const signup = useSignup();
    const error = useAuthError();

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const handleSubmit = e => {
        e.preventDefault()
        signup(email, password)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                {error && <p style={{ color: 'red' }} >{`${error.error}`}</p>}
                <input placeholder='email' onChange={({ target }) => setEmail(target.value)} />
                <input placeholder='password' onChange={({ target }) => setPassword(target.value)} />
                <button>submit</button>
            </form>
        </div>
    )
}
