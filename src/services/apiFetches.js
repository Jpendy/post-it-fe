import { post, get, del } from './request';

// const URL = 

export const fetchAllPosts = () => {
    return get('/api/v1/posts')
}

export const createPost = (body = {}, token) => {
    return post('/api/v1/posts', body, token)
}