import React from 'react'
import { Link } from 'react-router-dom'
import { useActiveUser } from '../../hooks/AuthContext'
import './PostsList.css'

export default function PostsList({ posts, handleVote }) {

    const activeUser = useActiveUser()

    const list = posts.map((item, i) => {
        return (
            <li key={i} className='list-item' >
                <Link to={`/post-details/${item.id}`} >
                    <h2 className='post-title' >{item.title}</h2>
                </Link>
                {activeUser && <button
                    className='vote-button'
                    onClick={(e) => handleVote(item.id, e)}
                    value={1} >
                    Like
                </button>}

                <span className='vote-score' > {item.vote_score} </span>

                {activeUser && <button
                    className='vote-button'
                    onClick={(e) => handleVote(item.id, e)}
                    value={-1}
                >Dislike
                 </button>}

                <p className='category' >{item.category}</p>
                <img className='image' src={item.image || 'https://placekitten.com/200/300'} style={{ width: '150px' }} alt='' />
                {item.video && <iframe className='video' title='video' src={item.video} />}
            </li>
        )
    })

    return (
        <ul className='post-list' >
            {list}
        </ul>
    )
}
