/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import CategoryFilter from '../../components/categoryFilter/CategoryFilter';
import PostsList from '../../components/PostsList/PostsList'
import PostSort from '../../components/postSort/PostSort';
import { useActiveUser } from '../../hooks/AuthContext'
import { fetchAllPosts, getUserVoteHistory, postNewVoteHistory, updateVoteHistory, voteOnPost } from '../../services/apiFetches'

export default function FrontPage() {
    const activeUser = useActiveUser();

    const [posts, setPosts] = useState([])
    const [postFilter, setPostFilter] = useState('')
    const [sortType, setSortType] = useState('vote_score')
    const [voteHistory, setVoteHistory] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchAllPosts()
            .then(posts => setPosts(posts))

        activeUser && getUserVoteHistory(activeUser?.token)
            .then(votes => setVoteHistory(votes))
    }, [])

    console.log(voteHistory)

    const handleVote = (id, e) => {
        voteOnPost(id, { vote: +e.target.value }, activeUser.token)
            .then(fetchAllPosts)
            .then(posts => setPosts(posts))
    }

    const handleVoteClick = async (id, e) => {
        if (loading) return
        setLoading(true)

        const voteType = e.target.value;

        const currentVote = voteHistory.find(vote => vote.post_id === id && vote.owner_id === activeUser.id)

        if (!currentVote) {
            await voteOnPost(id, { vote: voteType === 'upvote' ? 1 : -1 }, activeUser.token)
            setPosts(await fetchAllPosts())
            await postNewVoteHistory({ post_id: id, vote: voteType === 'upvote' ? 1 : -1 }, activeUser.token)
            setVoteHistory(await getUserVoteHistory(activeUser?.token))
        }

        else if (currentVote.vote === 0) {
            await voteOnPost(id, { vote: voteType === 'upvote' ? 1 : -1 }, activeUser?.token)
            setPosts(await fetchAllPosts())
            await updateVoteHistory(currentVote.id, { post_id: id, vote: voteType === 'upvote' ? 1 : -1 }, activeUser?.token)
            setVoteHistory(await getUserVoteHistory(activeUser?.token))
        }

        else if (currentVote.vote === -1) {
            await voteOnPost(id, { vote: voteType === 'upvote' ? 2 : 1 }, activeUser?.token)
            setPosts(await fetchAllPosts())
            await updateVoteHistory(currentVote.id, { post_id: id, vote: voteType === 'upvote' ? 1 : -0 }, activeUser?.token)
            setVoteHistory(await getUserVoteHistory(activeUser?.token))
        }

        else {
            await voteOnPost(id, { vote: voteType === 'upvote' ? -1 : -2 }, activeUser?.token)
            setPosts(await fetchAllPosts())
            await updateVoteHistory(currentVote.id, { post_id: id, vote: voteType === 'upvote' ? 0 : -1 }, activeUser?.token)
            setVoteHistory(await getUserVoteHistory(activeUser?.token))
        }

        setLoading(false)
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
                handleVoteClick={handleVoteClick}
                postFilter={postFilter}
                sortType={sortType}
                voteHistory={voteHistory}
            />
        </div>
    )
}
