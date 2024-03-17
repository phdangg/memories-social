import express from "express";
import { getPost, getPostsByCreator, commentPost, getPosts, createPosts, updatePost, deletePost, likePost, getPostsBySearch } from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router(); 

router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/creator', getPostsByCreator);
router.get('/search', getPostsBySearch);

router.post('/', auth, createPosts);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', commentPost);




export default router;