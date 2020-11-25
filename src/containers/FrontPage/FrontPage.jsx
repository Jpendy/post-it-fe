import React, { useState, useEffect } from 'react'
import CategoryFilter from '../../components/categoryFilter/CategoryFilter';
import PostsList from '../../components/PostsList/PostsList'
import PostSort from '../../components/postSort/PostSort';
import { useActiveUser } from '../../hooks/AuthContext'
import { fetchAllPosts, voteOnPost } from '../../services/apiFetches'

export default function FrontPage() {
    const activeUser = useActiveUser();

    const [posts, setPosts] = useState([])
    const [postFilter, setPostFilter] = useState('')
    const [sortType, setSortType] = useState('')

    useEffect(() => {
        fetchAllPosts()
            .then(posts => setPosts(posts))
    }, [])

    const handleVote = (id, e) => {
        voteOnPost(id, { vote: +e.target.value }, activeUser.token)
            .then(fetchAllPosts)
            .then(posts => setPosts(posts))
    }

    const handleFilterChange = e => {
        setPostFilter(e.target.value)
    }

    const handleSortChange = e => {
        setSortType(e.target.value)
    }

    return (
        <div>
            <CategoryFilter posts={posts} handleFilterChange={handleFilterChange} />
            <PostSort handleSortChange={handleSortChange} />
            <PostsList
                posts={posts}
                handleVote={handleVote}
                postFilter={postFilter}
                sortType={sortType}
            />
        </div>
    )
}
