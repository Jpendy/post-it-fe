import React from 'react'

export default function PostsList({ posts }) {

    const list = posts.map(item => {
        return (
            <li>
                <h2>{item.title}</h2>
                <p>{item.vote_score}</p>
                <img src={item.image} alt='' />
                <p>{item.body}</p>
            </li>
        )
    })

    return (
        <ul>
            {list}
        </ul>
    )
}
