/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import CategoryFilter from '../../components/categoryFilter/CategoryFilter';
import PostsList from '../../components/PostsList/PostsList'
import PostSort from '../../components/postSort/PostSort';
import usePosts from '../../hooks/usePosts';

export default function FrontPage() {
    const [postFilter, setPostFilter] = useState('')
    const [sortType, setSortType] = useState('vote_score')

    const { posts, voteHistory, upVoteStyle, handleVoteClick } = usePosts('ALL_POSTS')

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
                handleVoteClick={handleVoteClick}
                postFilter={postFilter}
                sortType={sortType}
                voteHistory={voteHistory}
            // upVoteStyle={upVoteStyle}
            />
        </div>
    )
}
