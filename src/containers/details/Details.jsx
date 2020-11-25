import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostsList from '../../components/PostsList/PostsList'
import { useActiveUser } from '../../hooks/AuthContext'
import { fetchAllPosts, voteOnPost, getPostById } from '../../services/apiFetches'

export default function Details() {
    const activeUser = useActiveUser()
    const { id } = useParams()
    const [posts, setPosts] = useState([])

    const handleVote = (id, e) => {
        voteOnPost(id, { vote: +e.target.value }, activeUser.token)
            .then(fetchAllPosts)
            .then(posts => setPosts(posts))
    }

    useEffect(() => {
        getPostById(id)
            .then(posts => setPosts(posts))
    })

    return (
        <div>
            <PostsList posts={posts} handleVote={handleVote} />
        </div>
    )
}
