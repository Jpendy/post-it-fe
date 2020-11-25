/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useActiveUser } from '../../hooks/AuthContext'
import { voteOnPost, getPostById, deletePost, getCommentsByPostId, postNewComment } from '../../services/apiFetches'
import Post from '../../components/post/Post'
import Comments from '../../components/comments/Comments'
import AddComment from '../../components/addComment/AddComment'

export default function Details() {
    const activeUser = useActiveUser()
    const { id } = useParams()
    const history = useHistory();
    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    const [commentTitle, setCommentTitle] = useState('')
    const [commentBody, setCommentBody] = useState('')

    useEffect(async () => {
        const [post] = await getPostById(id)
        setPost(post)

        const comments = await getCommentsByPostId(id)
        setComments(comments)
    }, [])

    const handleVote = (id, e) => {
        voteOnPost(id, { vote: +e.target.value }, activeUser.token)
            .then(() => getPostById(id))
            .then(([post]) => setPost(post))
    }

    const handleDeletePost = () => {
        deletePost(id, activeUser.token)
        history.push('/')
    }

    const handleCommentSubmit = async e => {
        e.preventDefault()

        const newComment = {
            post_id: id,
            title: commentTitle,
            body: commentBody
        }

        await postNewComment(newComment, activeUser.token)

        const comments = await getCommentsByPostId(id)
        setComments(comments)

        setCommentTitle('')
        setCommentBody('')
    }

    return (
        <div>
            <Post post={post} handleDelete={handleDeletePost} handleVote={handleVote} />

            {activeUser && <AddComment
                handleCommentSubmit={handleCommentSubmit}
                setCommentTitle={setCommentTitle}
                setCommentBody={setCommentBody}
                commentTitle={commentTitle}
                commentBody={commentBody}
            />}

            <Comments comments={comments} />
        </div>
    )
}
