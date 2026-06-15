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

// Valid API keys (in a real app, these would be in a database)
const API_KEYS = ["henny-key-123", "test-key-456", "admin-key-789"];

// API key middleware
app.use('/api', (req, res, next) => {
  const key = req.query.api_key;
  if (!key) {
    return res.status(401).json({ message: "API key is required" });
  }
  if (!API_KEYS.includes(key)) {
    return res.status(403).json({ message: "Invalid API key" });
  }
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