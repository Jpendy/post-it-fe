import { post, get, del, put } from './request';

// Post Fetches
export const fetchAllPosts = () => {
    return get('/api/v1/posts')
}

export const getPostById = id => {
    return get(`/api/v1/posts/${id}`)
}

export const getUserPosts = userId => {
    return get(`/api/v1/posts/user-posts/${userId}`)
}

export const createPost = (body = {}, token) => {
    return post('/api/v1/posts', body, token)
}

export const voteOnPost = (id, body, token) => {
    return put(`/api/v1/posts/vote/${id}`, body, token)
}

export const deletePost = (id, token) => {
    console.log(token)
    return del(`/api/v1/posts/${id}`, token)
}


// Post Vote History Fetches 
export const getUserVoteHistory = token => {
    return get('/api/v1/votes', token)
}

export const postNewVoteHistory = (body, token) => {
    return post('/api/v1/votes', body, token)
}

export const updateVoteHistory = (id, body, token) => {
    return put(`/api/v1/votes/${id}`, body, token)
}


// Comment Fetches
export const getCommentsByPostId = postId => {
    return get(`/api/v1/comments/${postId}`)
}

export const postNewComment = (body, token) => {
    return post(`/api/v1/comments`, body, token)
}

export const voteOnComment = (id, body, token) => {
    return put(`/api/v1/comments/vote/${id}`, body, token)
}

// Comments Vote History Fetches
export const getUserCommentsVoteHistory = token => {
    return get('/api/v1/comment-votes', token)
}

export const postNewCommentVoteHistory = (body, token) => {
    return post('/api/v1/comment-votes', body, token)
}

export const updateCommentVoteHistory = (id, body, token) => {
    return put(`/api/v1/comment-votes/${id}`, body, token)
}