import { post, get, del } from './request';

// const URL = 

export const fetchAllPosts = () => {
    return get('/posts')
}