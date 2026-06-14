import express from "express";
import users from "../data/users.js";

const router = express.Router();

// GET all users
router.get('/', (req, res) => {
    res.json(users);
});

// GET a single user by ID
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// POST - Create a new user
router.post('/', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PATCH - Update a user
router.patch('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    res.json(user);
});

// DELETE - Remove a user
router.delete('/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({message: "User not found"});
    }
    const deleted = users.splice(index, 1);
    res.json({message: "User Deleted", user: deleted[0] });
});

export default router;