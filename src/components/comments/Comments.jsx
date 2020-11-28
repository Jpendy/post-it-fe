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

                    <div className='vote-area' >
                        {activeUser && <img
                            src='/transparent-upvote.png'
                            style={{
                                filter: currentVote?.vote === 1 && 'drop-shadow(0px 0px 5px lime)'
                                // boxShadow: currentVote?.vote === 1 && '2px 2px 8px orangered'
                            }}
                            className='vote-button'
                            // disabled={loading}
                            onClick={(e) => handleCommentVoteClick(id, e)}
                            data-vote-type='upvote'
                            alt=''
                        />
                        }

                        <span className='vote-score' > {vote_score} </span>

                        {activeUser && <img
                            src='/transparent-downvote.png'
                            style={{
                                filter: currentVote?.vote === -1 && 'drop-shadow(0px 0px 5px blue)'
                                // boxShadow: currentVote?.vote === -1 && '2px 2px 8px blue'
                            }}
                            className='vote-button'
                            // disabled={loading}
                            onClick={(e) => handleCommentVoteClick(id, e)}
                            data-vote-type='downvote'
                            alt=''
                        />
                        }
                    </div>

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
