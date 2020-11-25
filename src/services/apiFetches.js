import { post, get, del, put } from './request';

// const URL = 

export const fetchAllPosts = () => {
    return get('/api/v1/posts')
}

export const createPost = (body = {}, token) => {
    return post('/api/v1/posts', body, token)
}

export const voteOnPost = (id, body, token) => {
    return put(`/api/v1/posts/vote/${id}`, body, token)
}