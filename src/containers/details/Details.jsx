/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useActiveUser } from '../../hooks/AuthContext'
import { voteOnPost, getPostById, deletePost, getCommentsByPostId, postNewComment } from '../../services/apiFetches'
import Post from '../../components/post/Post'
import Comments from '../../components/comments/Comments'
import AddComment from '../../components/addComment/AddComment'
import usePosts from '../../hooks/usePosts'
import PostsList from '../../components/PostsList/PostsList'

export default function Details() {
    const activeUser = useActiveUser()
    const { id } = useParams()
    const history = useHistory();
    const [comments, setComments] = useState([])
    const [commentTitle, setCommentTitle] = useState('')
    const [commentBody, setCommentBody] = useState('')

    const { posts, voteHistory, handleVoteClick } = usePosts('SINGLE_POST')

    useEffect(async () => {

        const comments = await getCommentsByPostId(id)
        setComments(comments)
    }, [])


    const handleDeletePost = () => {
        const confirmation = window.confirm('Are you sure you want to delete this post?')

        if (confirmation) {

            deletePost(id, activeUser.token)
            history.push('/')
        }
        else return
    }

    const handleCommentSubmit = async e => {
        e.preventDefault()

        const newComment = {
            post_id: id,
            title: commentTitle,
            body: commentBody
        }

        await postNewComment(newComment, activeUser.token)

        const comments = await getCommentsByPostId(id)
        setComments(comments)

        setCommentTitle('')
        setCommentBody('')
    }

    return (
        <div>
            {/* <Post post={posts} handleDelete={handleDeletePost} handleVote={handleVoteClick} /> */}

            <PostsList
                posts={posts}
                handleVoteClick={handleVoteClick}
                // postFilter={postFilter}
                // sortType={sortType}
                voteHistory={voteHistory}
            />

            {activeUser && <AddComment
                handleCommentSubmit={handleCommentSubmit}
                setCommentTitle={setCommentTitle}
                setCommentBody={setCommentBody}
                commentTitle={commentTitle}
                commentBody={commentBody}
            />}

            <Comments comments={comments} />
        </div>
    )
}
