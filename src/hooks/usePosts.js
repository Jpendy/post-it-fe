/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { fetchAllPosts, getPostById, getUserPosts, getUserVoteHistory, postNewVoteHistory, updateVoteHistory, voteOnPost } from '../services/apiFetches'
import { useActiveUser } from './AuthContext';

export default function usePosts(postCommand) {
    const { userId } = useParams()
    const { id } = useParams()

    const activeUser = useActiveUser();

    const [posts, setPosts] = useState([])
    const [voteHistory, setVoteHistory] = useState([])
    const [loading, setLoading] = useState(false)
    // const [upVoteStyle, setUpVoteStyle] = useState(null)

    const postFetchFn = () => {
        return postCommand === 'ALL_POSTS' ? fetchAllPosts()
            : postCommand === 'USER_POSTS' ? getUserPosts(userId)
                : postCommand === 'SINGLE_POST' ? getPostById(id)
                    : null
    }

    useEffect(() => {
        setLoading(true)

        postFetchFn()
            .then(posts => setPosts(posts))

        activeUser && getUserVoteHistory(activeUser?.token)
            .then(votes => setVoteHistory(votes))

        setLoading(false)
    }, [id, userId, activeUser])

    const handleVoteClick = async (id, e) => {
        if (loading) return
        setLoading(true)

        const voteType = e.target.value;
        const currentVote = voteHistory.find(vote => vote.post_id === id && vote.owner_id === activeUser.id)

        if (!currentVote) {
            // setUpVoteStyle(voteType === 'upvote' ? 'upvote' : 'downvote')

            await voteOnPost(id, { vote: voteType === 'upvote' ? 1 : -1 }, activeUser.token)
            setPosts(await postFetchFn())

            await postNewVoteHistory({ post_id: id, vote: voteType === 'upvote' ? 1 : -1 }, activeUser.token)
            setVoteHistory(await getUserVoteHistory(activeUser?.token))
        }

        else if (currentVote.vote === 0) {
            // setUpVoteStyle(voteType === 'upvote' ? 'upvote' : 'downvote')

            await voteOnPost(id, { vote: voteType === 'upvote' ? 1 : -1 }, activeUser?.token)
            setPosts(await postFetchFn())

            await updateVoteHistory(currentVote.id, { post_id: id, vote: voteType === 'upvote' ? 1 : -1 }, activeUser?.token)
            setVoteHistory(await getUserVoteHistory(activeUser?.token))
        }

        else if (currentVote.vote === -1) {
            // setUpVoteStyle(voteType === 'upvote' ? 'upvote' : null)

            await voteOnPost(id, { vote: voteType === 'upvote' ? 2 : 1 }, activeUser?.token)
            setPosts(await postFetchFn())

            await updateVoteHistory(currentVote.id, { post_id: id, vote: voteType === 'upvote' ? 1 : -0 }, activeUser?.token)
            setVoteHistory(await getUserVoteHistory(activeUser?.token))
        }

        else {
            // setUpVoteStyle(voteType === 'upvote' ? null : 'downvote')

            await voteOnPost(id, { vote: voteType === 'upvote' ? -1 : -2 }, activeUser?.token)
            setPosts(await postFetchFn())

            await updateVoteHistory(currentVote.id, { post_id: id, vote: voteType === 'upvote' ? 0 : -1 }, activeUser?.token)
            setVoteHistory(await getUserVoteHistory(activeUser?.token))
        }

        setLoading(false)
    }



    return {
        posts,
        voteHistory,
        // upVoteStyle,
        handleVoteClick,
    }
}
