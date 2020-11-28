import { post, get } from './request';

export const fetchSignup = (email, password) => {
    return post('/auth/signup', { email, password });
}

export const fetchLogin = (email, password) => {
    return post('/auth/signin', { email, password });
}