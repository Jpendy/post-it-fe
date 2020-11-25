/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import PostsList from '../../components/PostsList/PostsList'
import { useActiveUser } from '../../hooks/AuthContext'
import { fetchAllPosts, voteOnPost, getPostById, deletePost } from '../../services/apiFetches'
import Post from '../../components/post/Post'

export default function Details() {
    const activeUser = useActiveUser()
    const { id } = useParams()
    const history = useHistory();
    const [post, setPost] = useState([])

    const handleVote = (id, e) => {
        voteOnPost(id, { vote: +e.target.value }, activeUser.token)
            .then(() => getPostById(id))
            .then(([post]) => setPost(post))
    }

    const handleDeletePost = () => {
        deletePost(id, activeUser.token)
        history.push('/')
    }

    useEffect(() => {
        getPostById(id)
            .then(([post]) => setPost(post))
    }, [])

    return (
        <div>
            <Post post={post} handleDelete={handleDeletePost} handleVote={handleVote} />
        </div>
    )
}
