import React from 'react'
import { useActiveUser } from '../../hooks/AuthContext'
import '../PostsList/PostsList.css'

export default function Post({ post, handleVote, handleDelete }) {

    const activeUser = useActiveUser();

    return (
        <div className='post-list'>
            <div className='list-item'>
                <h2 className='post-title' >{post.title}</h2>
                {activeUser && <button
                    className='vote-button'
                    onClick={(e) => handleVote(post.id, e)}
                    value={1} >
                    Like
                </button>}

                <span className='vote-score' > {post.vote_score} </span>

                {activeUser && <button
                    className='vote-button'
                    onClick={(e) => handleVote(post.id, e)}
                    value={-1}
                >Dislike
                 </button>}

                <p className='category' >{post.category}</p>
                <img className='image' src={post.image || 'https://placekitten.com/200/300'} style={{ width: '150px' }} alt='' />
                {post.video && <iframe className='video' title='video' src={post.video} />}
                <p className='text-body' >{post.body}</p>
                <button onClick={handleDelete} >Delete Post</button>
            </div>
        </div>
    )
}
