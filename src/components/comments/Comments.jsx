import React from 'react'
import { Link } from 'react-router-dom'
import { useActiveUser } from '../../hooks/AuthContext'
import './Comments.css'

export default function Comments({ comments, handleCommentVoteClick, commentVoteHistory, postFilter, sortType }) {

    const activeUser = useActiveUser()
    const commentsList = comments
        .sort((a, b) => b[sortType] - a[sortType])
        .map(({ id, title, body, vote_score, comment_creator, owner_id }, i) => {

            const currentVote = commentVoteHistory.find(vote => vote.comment_id === id && vote.owner_id === activeUser?.id)

            return (
                <li key={i} className='comment' >

                    {activeUser && <button
                        style={{
                            boxShadow: currentVote?.vote === 1 && '2px 2px 8px orangered'
                        }}
                        className='vote-button'
                        onClick={(e) => handleCommentVoteClick(id, e)}
                        value='upvote' >
                        Like
                </button>}
                    <span>{vote_score}</span>

                    {activeUser && <button
                        style={{
                            boxShadow: currentVote?.vote === -1 && '2px 2px 8px blue'
                        }}
                        className='vote-button'
                        onClick={(e) => handleCommentVoteClick(id, e)}
                        value='downvote'
                    >Dislike
                 </button>}

                    <h4>{title}</h4>
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
