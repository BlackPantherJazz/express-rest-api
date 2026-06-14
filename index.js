import express from 'express';
const app = express();
const PORT = 3000;

// This middleware lets Express read JSON from request bodies
app.use(express.json());

// Import our data
import users from "./data/users.js";
import posts from "./data/post.js";

// Our first route - GET all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// GET a single user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// GET all posts
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// GET a single post by ID
app.get('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

// POST - Create a new user
app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    res.status(201).json(newUser)
});

// Patch - Update a user
app.patch('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ message: "User not found"});
    }
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    res.json(user);
});

// DELETE - Remove a user
app.delete('/api/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: "User not found"});
    }
    const deleted = users.splice(index, 1);
    res.json({ message: "User Deleted", user: deleted[0]});
});

    // Start the server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

