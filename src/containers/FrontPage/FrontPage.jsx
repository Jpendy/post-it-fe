import React, { useState, useEffect } from 'react'
import PostsList from '../../components/PostsList/PostsList'
import { fetchAllPosts } from '../../services/apiFetches'

export default function FrontPage() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetchAllPosts()
            .then(posts => setPosts(posts))
    }, [])

    return (
        <div>
            <PostsList posts={posts} />
        </div>
    )
}
