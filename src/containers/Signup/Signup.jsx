import React, { useState } from 'react'
import { useSignup, useToken } from '../../hooks/AuthContext'

export default function Signup() {
    const signup = useSignup();

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const handleSubmit = e => {
        e.preventDefault()

        signup(email, password)

    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <input placeholder='email' onChange={({ target }) => setEmail(target.value)} />
                <input placeholder='password' onChange={({ target }) => setPassword(target.value)} />
                <button>submit</button>
            </form>
        </div>
    )
}
