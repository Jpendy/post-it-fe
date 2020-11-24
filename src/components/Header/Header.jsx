import React from 'react'
import { Link } from 'react-router-dom'
import { useActiveUser } from '../../hooks/AuthContext'

export default function Header() {

    const activeUser = useActiveUser()

    return !activeUser
        ? (
            <>
                <Link to='/signup' >Sign Up</Link>
                <Link to='/login' >Login</Link>
            </>
        )

        : (
            <div>
                <Link to='/' >Front Page</Link>
                <h3>Hello {activeUser.email}</h3>
            </div>
        )
}
