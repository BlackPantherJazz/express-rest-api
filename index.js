import express from 'express';
import usersRouter from './routes/users.js';
import postsRouter from './routes/posts.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`);
  next();
});

// Mount the routers
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});