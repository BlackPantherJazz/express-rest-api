import express from 'express';
import posts from '../data/post.js';

const router = express.Router();

// GET all posts
router.get('/', (req, res) => {
    res.json(posts);
});

// GET a single post by ID
router.get('/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post) {
    res.json(post);
} else {
    res.status(404).json({ message: "Post not found" });
}
});

export default router;