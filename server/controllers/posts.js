import PostMessage from "../models/postMessage.js"

export const getPosts = async (req,res)=>{
    const { page } = req.query;

    try {
        const LIMIT = 5;
        const startIndex = (Number(page)-1)*LIMIT; // get the start index
        const total = await PostMessage.countDocuments({});

        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT)});
    } catch (error) {
        res.status(404).json({message: error.message}); 
    }
}

export const getPostsBySearch = async (req,res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, 'i');
        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') }}]});
        res.status(200).json({ data: posts});
    } catch (error) {
        res.status(404).json({message: error.message});                
    }
}

export const createPosts = async (req,res) => {
    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString()});
    
    try {        
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});       
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (_id.match(/^[0-9a-fA-F]{24}$/)) {
        const updatePost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });        
        res.json(updatePost);
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        await PostMessage.findOneAndDelete(id);        
        res.json({ message: 'Post deleted successfully' });
    }
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: "Unauthenticated"});
    
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        res.json({ message: 'Invalid id' });
    }
    
    const post = await PostMessage.findById(id);
    const index = post.likes.findIndex((id)=>id===String(req.userId));

    if (index === -1) {
        // like the post
        post.likes.push(req.userId);
    } else {
        // dislike the post
        post.likes = post.likes.filter((id)=> id !== String(req.userId))
    }

    const updatePost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.json(updatePost);
}