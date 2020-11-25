import React from 'react'
import { Link } from 'react-router-dom'
import './Comments.css'

export default function Comments({ comments }) {
    const commentsList = comments.map(({ title, body, vote_score, comment_creator, owner_id }, i) => {
        return (
            <li key={i} className='comment' >
                <span>{vote_score} - </span>
                <span>{title}</span>
                <p>{body}</p>
                <p>Comment posted by  <Link to={`/user-posts/${owner_id}`} >{comment_creator}</Link></p>
            </li>
        )
    })

    return (
        <ul className='comment-list' >
            {commentsList}
        </ul>
    )
}
