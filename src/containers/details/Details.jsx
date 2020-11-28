/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useActiveUser } from '../../hooks/AuthContext'
import Comments from '../../components/comments/Comments'
import AddComment from '../../components/addComment/AddComment'
import usePosts from '../../hooks/usePosts'
import PostsList from '../../components/PostsList/PostsList'
import useComments from '../../hooks/useComments'

export default function Details() {
    const activeUser = useActiveUser()
    const { id } = useParams()
    // const history = useHistory();

    const { posts, voteHistory, handleVoteClick } = usePosts('SINGLE_POST')

    const { comments,
        commentTitle,
        commentBody,
        setCommentBody,
        setCommentTitle,
        handleCommentSubmit,
        handleCommentVoteClick,
        commentVoteHistory } = useComments(id)


    // const handleDeletePost = () => {
    //     const confirmation = window.confirm('Are you sure you want to delete this post?')

    //     if (confirmation) {

    //         deletePost(id, activeUser.token)
    //         history.push('/')
    //     }
    //     else return
    // }

    return (
        <div>
            <PostsList
                posts={posts}
                handleVoteClick={handleVoteClick}
                // postFilter={postFilter}
                // sortType={sortType}
                voteHistory={voteHistory}
            />

            {activeUser && <AddComment
                handleCommentSubmit={handleCommentSubmit}
                setCommentTitle={setCommentTitle}
                setCommentBody={setCommentBody}
                commentTitle={commentTitle}
                commentBody={commentBody}
            />}

            <Comments
                comments={comments}
                commentVoteHistory={commentVoteHistory}
                handleCommentVoteClick={handleCommentVoteClick}
            />
        </div>
    )
}
