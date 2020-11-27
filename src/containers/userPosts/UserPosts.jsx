/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import CategoryFilter from '../../components/categoryFilter/CategoryFilter';
import PostsList from '../../components/PostsList/PostsList';
import PostSort from '../../components/postSort/PostSort';
import usePosts from '../../hooks/usePosts';

export default function UserPosts() {
    const [postFilter, setPostFilter] = useState('')
    const [sortType, setSortType] = useState('')

    const { posts, voteHistory, handleVoteClick } = usePosts('USER_POSTS')


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

            {posts.length
                ? <h3>All Posts By {posts[0].post_creator}</h3>
                : <h3>No Posts</h3>
            }

            <PostsList
                posts={posts}
                handleVoteClick={handleVoteClick}
                postFilter={postFilter}
                sortType={sortType}
                voteHistory={voteHistory}
            />
        </div>
    )
}
