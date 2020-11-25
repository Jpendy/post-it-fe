/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CategoryFilter from '../../components/categoryFilter/CategoryFilter';
import PostsList from '../../components/PostsList/PostsList';
import PostSort from '../../components/postSort/PostSort';
import { useActiveUser } from '../../hooks/AuthContext'
import { getUserPosts, voteOnPost } from '../../services/apiFetches'

export default function UserPosts() {
    const activeUser = useActiveUser();
    const [userPosts, setUserPosts] = useState([])
    const [postFilter, setPostFilter] = useState('')
    const [sortType, setSortType] = useState('')
    const { userId } = useParams()

    console.log(activeUser)

    useEffect(() => {
        getUserPosts(userId)
            .then(posts => setUserPosts(posts))
    }, [])

    const handleVote = (id, e) => {
        voteOnPost(id, { vote: +e.target.value }, activeUser.token)
            .then(getUserPosts)
            .then(posts => setUserPosts(posts))
    }

    const handleFilterChange = e => {
        setPostFilter(e.target.value)
    }

    const handleSortChange = e => {
        setSortType(e.target.value)
    }

    console.log(userPosts)
    return (
        <div>
            <CategoryFilter posts={userPosts} handleFilterChange={handleFilterChange} />
            <PostSort handleSortChange={handleSortChange} />
            <PostsList
                posts={userPosts}
                handleVote={handleVote}
                postFilter={postFilter}
                sortType={sortType}
            />        </div>
    )
}
