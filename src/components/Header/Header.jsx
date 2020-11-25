import React from 'react'
import { Link } from 'react-router-dom'
import { useActiveUser, useLogOut } from '../../hooks/AuthContext'

export default function Header() {
    const logout = useLogOut()
    const activeUser = useActiveUser()

    return !activeUser
        ? (
            <>
                <Link to='/signup' >Sign Up</Link>
                <Link to='/login' >Login</Link>
                <Link to='/' >Front Page</Link>
            </>
        )

        : (
            <div>
                <Link to='/' >Front Page</Link>
                <Link to='/create-post' >New Post</Link>
                <button onClick={logout} >Log Out</button>
                <h3>Hello {activeUser.email}</h3>
            </div>
        )
}
