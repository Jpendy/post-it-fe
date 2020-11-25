import React from 'react'

export default function PostsList({ posts }) {

    const list = posts.map((item, i) => {
        return (
            <li key={i} >
                <h2>{item.title}</h2>
                <p>{item.vote_score}</p>
                <p>{item.category}</p>
                <img src={item.image || 'https://placekitten.com/200/300'} style={{ width: '150px' }} alt='' />
                {item.video && <iframe title='video' src={item.video} />}
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
