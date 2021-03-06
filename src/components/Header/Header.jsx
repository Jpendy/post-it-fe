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

                <Link className='logo-link' to='/' > <img className='logo' src='/postr-logo2.png' alt="" /></Link>

                <div className='link-buttons' >
                    <Link to='/signup' >Sign Up</Link>
                    <Link to='/login' >Login</Link>
                    <Link to='/' >Front Page</Link>
                </div>
            </div>
        )

        : (
            <div className='header-body' >
                <Link className='logo-link' to='/' > <img className='logo' src='/postr-logo2.png' alt="" /></Link>


                <div className='link-buttons' >
                    <Link to='/' >Front Page</Link>
                    <Link to='/create-post' >New Post</Link>
                    <Link to={`/user-posts/${activeUser.id}`} >My Posts</Link>
                </div>

                <div className='header-right-area'>
                    <Link className='username-link' to='/' ><h3>Hello {activeUser.email}</h3></Link>
                    <button onClick={logout} >Log Out</button>
                </div>
            </div>
        )
}
