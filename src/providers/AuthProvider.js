import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../hooks/AuthContext';
import { fetchLogin, fetchSignup } from '../services/auth';

export default function AuthProvider({ children }) {
    const history = useHistory()

    const [activeUser, setActiveUser] = useState(null)
    const [authError, setAuthError] = useState(null)

    const authService = (serviceFn, ...args) => {
        setAuthError(null);
        return serviceFn(...args)
            .then((user) => {
                setActiveUser(user)
                history.push('/')
            })
            .catch(err => setAuthError(err));
    };



    const login = (email, password) => authService(fetchLogin, email, password);

    const signup = (email, password) => authService(fetchSignup, email, password);

    return (
        <AuthContext.Provider value={{ activeUser, authError, signup, login }} >
            {children}
        </AuthContext.Provider>
    )
}