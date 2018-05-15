import axios from 'axios';

import {
    ADD_POST,
    DELETE_POST,
    GET_ERRORS,
    GET_POSTS,
    POST_LOADING
} from './types';

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

// Delete post
export const deletePost = id => dispatch => {
    axios
        .delete(`/api/posts/${id}`)
        .then(res => dispatch({ type: DELETE_POST, payload: id }))
        .catch(e => dispatch({ type: GET_ERRORS, payload: e.response.data }));
};

// Add like
export const addLike = id => dispatch => {
    axios
        .post(`/api/posts/like/${id}`)
        .then(res => dispatch(getPosts()))
        .catch(e => dispatch({ type: GET_ERRORS, payload: e.response.data }));
};

// Remove like
export const removeLike = id => dispatch => {
    axios
        .post(`/api/posts/unlike/${id}`)
        .then(res => dispatch(getPosts()))
        .catch(e => dispatch({ type: GET_ERRORS, payload: e.response.data }));
};

// Set loading state
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    };
};
