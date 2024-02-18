import PostMessage from "../models/postMessage.js"

export const getPosts = async (req,res)=>{
    try {

        const postMessage = await PostMessage.find();

        res.status(200).json(postMessage);

    } catch (error) {

        res.status(404).json({message: error.message});        
        
    }
}

export const createPosts = async (req,res) => {
    const post = req.body;

    const newPost = new PostMessage(post);
    
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
    
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        res.json({ message: 'Invalid id' });
    }
    
    const post = await PostMessage.findById(id);
    const updatePost = await PostMessage.findByIdAndUpdate(id, {likedCount: post.likedCount + 1}, { new: true });
    res.json(updatePost);
}