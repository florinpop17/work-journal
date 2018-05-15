import axios from 'axios';

import { ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING } from './types';

// Add post
export const addPost = postData => dispatch => {
    axios
        .post('/api/posts', postData)
        .then(res => dispatch({ type: ADD_POST, payload: res.data }))
        .catch(e => dispatch({ type: GET_ERRORS, payload: e.response.data }));
};

// Get posts
export const getPosts = () => dispatch => {
    dispatch(setPostLoading());

    axios
        .get('/api/posts')
        .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
        .catch(e => dispatch({ type: GET_POSTS, payload: null }));
};

// Set loading state
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    };
};
