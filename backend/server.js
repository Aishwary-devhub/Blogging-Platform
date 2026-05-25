const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Post = require("./models/Post");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Blog API Running...");
});

// GET all posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET single post
app.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json(post);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// CREATE post
app.post("/posts", async (req, res) => {

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "Title and content required",
    });
  }

  try {

    const newPost = new Post({
      title,
      content,
    });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// UPDATE post
app.put("/posts/:id", async (req, res) => {

  try {

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json(updatedPost);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// DELETE post
app.delete("/posts/:id", async (req, res) => {

  try {

    const deletedPost = await Post.findByIdAndDelete(
      req.params.id
    );

    if (!deletedPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json({
      message: "Post deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});