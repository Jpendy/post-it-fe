/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import CategoryFilter from '../../components/categoryFilter/CategoryFilter';
import PostsList from '../../components/PostsList/PostsList'
import PostSort from '../../components/postSort/PostSort';
import usePosts from '../../hooks/usePosts';

export default function FrontPage() {
    const [postFilter, setPostFilter] = useState('')
    const [sortType, setSortType] = useState('vote_score')

    const { posts, voteHistory, handleVoteClick } = usePosts('ALL_POSTS')

    console.log(posts)
    const handleFilterChange = e => {
        setPostFilter(e.target.dataset.category)
    }

    const handleSortChange = e => {
        setSortType(e.target.value)
    }

    const style = {
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
    return (
        <div style={style} >
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
