import { useState, useEffect } from 'react'
import {
    getCommentsByPostId,
    postNewComment,
    voteOnComment,
    postNewCommentVoteHistory,
    getUserCommentsVoteHistory,
    updateCommentVoteHistory
} from '../services/apiFetches'
import { useActiveUser } from './AuthContext'

export default function useComments(postId) {

    const activeUser = useActiveUser();

    const [comments, setComments] = useState([])
    const [commentTitle, setCommentTitle] = useState('')
    const [commentBody, setCommentBody] = useState('')
    const [loading, setLoading] = useState(false)

    const [commentVoteHistory, setCommentVoteHistory] = useState([])

    console.log(commentVoteHistory)

    useEffect(() => {
        setLoading(true)

        getCommentsByPostId(postId)
            .then(comments => setComments(comments))

        activeUser && getUserCommentsVoteHistory(activeUser?.token)
            .then(comments => setCommentVoteHistory(comments))

        setLoading(false)
    }, [postId, activeUser])

    const handleCommentVoteClick = async (id, e) => {
        if (loading) return
        setLoading(true)

        const voteType = e.target.value;
        const currentVote = commentVoteHistory.find(vote => vote.comment_id === id && vote.owner_id === activeUser.id)

        if (!currentVote) {
            // setUpVoteStyle(voteType === 'upvote' ? 'upvote' : 'downvote')

            await voteOnComment(id, { vote: voteType === 'upvote' ? 1 : -1 }, activeUser.token)
            setComments(await getCommentsByPostId(postId))

            await postNewCommentVoteHistory({ comment_id: id, vote: voteType === 'upvote' ? 1 : -1 }, activeUser.token)
            setCommentVoteHistory(await getUserCommentsVoteHistory(activeUser?.token))
        }

        else if (currentVote.vote === 0) {
            // setUpVoteStyle(voteType === 'upvote' ? 'upvote' : 'downvote')

            await voteOnComment(id, { vote: voteType === 'upvote' ? 1 : -1 }, activeUser?.token)
            setComments(await getCommentsByPostId(postId))

            await updateCommentVoteHistory(currentVote.id, { comment_id: id, vote: voteType === 'upvote' ? 1 : -1 }, activeUser?.token)
            setCommentVoteHistory(await getUserCommentsVoteHistory(activeUser?.token))
        }

        else if (currentVote.vote === -1) {
            // setUpVoteStyle(voteType === 'upvote' ? 'upvote' : null)

            await voteOnComment(id, { vote: voteType === 'upvote' ? 2 : 1 }, activeUser?.token)
            setComments(await getCommentsByPostId(postId))

            await updateCommentVoteHistory(currentVote.id, { comment_id: id, vote: voteType === 'upvote' ? 1 : -0 }, activeUser?.token)
            setCommentVoteHistory(await getUserCommentsVoteHistory(activeUser?.token))
        }

        else {
            // setUpVoteStyle(voteType === 'upvote' ? null : 'downvote')

            await voteOnComment(id, { vote: voteType === 'upvote' ? -1 : -2 }, activeUser?.token)
            setComments(await getCommentsByPostId(postId))

            await updateCommentVoteHistory(currentVote.id, { comment_id: id, vote: voteType === 'upvote' ? 0 : -1 }, activeUser?.token)
            setCommentVoteHistory(await getUserCommentsVoteHistory(activeUser?.token))
        }

        setLoading(false)
    }

    const handleCommentSubmit = async e => {
        e.preventDefault()

        const newComment = {
            post_id: postId,
            title: commentTitle,
            body: commentBody
        }

        await postNewComment(newComment, activeUser.token)

        const comments = await getCommentsByPostId(postId)
        setComments(comments)

        setCommentTitle('')
        setCommentBody('')
    }

    return {
        comments,
        commentVoteHistory,
        setCommentTitle,
        setCommentBody,
        handleCommentSubmit,
        handleCommentVoteClick
    }
}
