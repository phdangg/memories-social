import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000' });


export const fetchPosts = () => API.get(url);
export const createPost = (newPost) => API.post(url,newPost);
export const updatePost = (id, updatePost) => API.patch(`${url}/${id}`, updatePost);
export const deletePost = (id) => API.delete(`${url}/${id}`);
export const likePost = (id) => API.patch(`${url}/${id}/likePost`);
