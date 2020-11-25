/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import PostsList from '../../components/PostsList/PostsList'
import { useActiveUser } from '../../hooks/AuthContext'
import { fetchAllPosts, voteOnPost, getPostById, deletePost, getCommentsByPostId } from '../../services/apiFetches'
import Post from '../../components/post/Post'
import Comments from '../../components/comments/Comments'

export default function Details() {
    const activeUser = useActiveUser()
    const { id } = useParams()
    const history = useHistory();
    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])

    const handleVote = (id, e) => {
        voteOnPost(id, { vote: +e.target.value }, activeUser.token)
            .then(() => getPostById(id))
            .then(([post]) => setPost(post))
    }

    const handleDeletePost = () => {
        deletePost(id, activeUser.token)
        history.push('/')
    }

    useEffect(async () => {
        const [post] = await getPostById(id)
        setPost(post)

        const comments = await getCommentsByPostId(id)
        setComments(comments)
    }, [])

    return (
        <div>
            <Post post={post} handleDelete={handleDeletePost} handleVote={handleVote} />
            <Comments comments={comments} />
        </div>
    )
}
