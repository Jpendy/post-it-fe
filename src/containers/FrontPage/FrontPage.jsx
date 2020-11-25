import React, { useState, useEffect } from 'react'
import PostsList from '../../components/PostsList/PostsList'
import { useActiveUser } from '../../hooks/AuthContext'
import { fetchAllPosts, voteOnPost } from '../../services/apiFetches'

export default function FrontPage() {
    const activeUser = useActiveUser();

    const [posts, setPosts] = useState([])

    const handleVote = (id, e) => {
        voteOnPost(id, { vote: +e.target.value }, activeUser.token)
            .then(fetchAllPosts)
            .then(posts => setPosts(posts))
    }

    useEffect(() => {
        fetchAllPosts()
            .then(posts => setPosts(posts))
    }, [])

    return (
        <div>
            <PostsList posts={posts} handleVote={handleVote} />
        </div>
    )
}
