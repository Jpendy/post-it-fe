import React from 'react'
import { Link } from 'react-router-dom'
import { useActiveUser, useLogOut } from '../../hooks/AuthContext'
import './Header.css'

export default function Header() {
    const logout = useLogOut()
    const activeUser = useActiveUser()

    return !activeUser
        ? (
            <div className='header-body' >
                <Link to='/signup' >Sign Up</Link>
                <Link to='/login' >Login</Link>
                <Link to='/' >Front Page</Link>
            </div>
        )

        : (
            <div className='header-body' >
                <h3>Hello {activeUser.email}</h3>
                <Link to='/' >Front Page</Link>
                <Link to='/create-post' >New Post</Link>
                <Link to={`/user-posts/${activeUser.id}`} >My Posts</Link>
                <button onClick={logout} >Log Out</button>
            </div>
        )
}
