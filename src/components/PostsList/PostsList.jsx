import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useActiveUser } from '../../hooks/AuthContext'
import './PostsList.css'

export default function PostsList({ posts, postFilter, sortType, handleVoteClick, voteHistory, handleFilterChange }) {

    const activeUser = useActiveUser()
    const [closedPosts, setClosedPosts] = useState([])
    const [allPostsClosed, setAllPostsClosed] = useState(false)

    const handleOpenDetails = (id) => {
        closedPosts.includes(id) ?
            setClosedPosts(closedPosts.filter(item => item !== id))
            : setClosedPosts([...closedPosts, id])
    }
    console.log(closedPosts)

    const handleCloseAllPosts = () => {
        const PostIdArr = posts.map(({ id }) => id)

        allPostsClosed ? setClosedPosts([]) : setClosedPosts(PostIdArr)
        setAllPostsClosed(allPostsClosed ? false : true)
    }

    const list = posts
        .filter(({ category }) => postFilter ? category === postFilter : true)
        .sort((a, b) => b[sortType] - a[sortType])
        .map((item, i) => {


            const currentVote = voteHistory.find(vote => vote.post_id === item.id && vote.owner_id === activeUser?.id)

            return (
                <>
                    <li key={i} className='list-item' >

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
                            <Link to={`/post-details/${item.id}`} >
                                <h2 className='post-title' >{item.title} </h2>
                            </Link>

                            <span
                                style={{ cursor: 'pointer' }}
                                onClick={handleFilterChange}
                                data-category={item.category}
                                className='category'
                            >
                                {item.category}</span>

                        </div>


                        <div className='vote-area' >
                            {activeUser && <img
                                src='/transparent-upvote.png'
                                style={{
                                    filter: currentVote?.vote === 1 && 'drop-shadow(0px 0px 5px lime)'
                                    // boxShadow: currentVote?.vote === 1 && '2px 2px 8px orangered'
                                }}
                                className='vote-button'
                                // disabled={loading}
                                onClick={(e) => handleVoteClick(item.id, e)}
                                data-vote-type='upvote'
                                alt=''
                            />
                            }

                            <span className='vote-score' > {item.vote_score} </span>

                            {activeUser && <img
                                src='/transparent-downvote.png'
                                style={{
                                    filter: currentVote?.vote === -1 && 'drop-shadow(0px 0px 5px blue)'
                                    // boxShadow: currentVote?.vote === -1 && '2px 2px 8px blue'
                                }}
                                className='vote-button'
                                // disabled={loading}
                                onClick={(e) => handleVoteClick(item.id, e)}
                                data-vote-type='downvote'
                                alt=''
                            />
                            }
                        </div>


                        <details className='post-details' open={!allPostsClosed}>



                            <img className='image' src={item.image} alt='' />
                            <summary onClick={() => handleOpenDetails(item.id)} style={{ cursor: 'pointer', fontSize: '8px' }} >
                                <img className='leo' src={closedPosts.includes(item.id) ? '/open-icon.png' : '/x-close.png'} alt='' />
                                {/* {closedPosts.includes(item.id) ? 'Expand' : 'Hide'} */}
                            </summary>
                            {item.video && <iframe className='video' title='video' src={item.video} />}
                            <p>{item.body}</p>
                        </details>
                        <p>Posted by <Link to={`/user-posts/${item.owner_id}`} style={{ textDecoration: 'none' }} >{item.post_creator}</Link></p>

                        <Link to={`/post-details/${item.id}`} style={{ textDecoration: 'none' }} >
                            <p>Comments: {item.comment_count}</p>
                        </Link>
                        {/* {activeUser?.email === item.post_creator && <button className='delete-button' >Delete Post</button>} */}

                    </li>
                </>
            )
        })

    return (
        <div className='post-list-area' >
            <button style={{ marginTop: '15px' }} onClick={handleCloseAllPosts} >{allPostsClosed ? 'Expand All' : 'Hide All'}</button>
            <ul className='post-list' >
                {list}
            </ul>
        </div>
    )
}
