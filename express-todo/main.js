// TODO API with CURD operations
// Data is stored in MongoDB

require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const Todo = require("./models/Todo");

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// GET /todos - Get all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error("Failed to fetch todos", error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// GET /todo/:id - Get a single todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    console.error("Failed to fetch todo", error);
    res.status(500).json({ error: "Failed to fetch todo" });
  }
});

// PUT /todos/:id - Update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (error) {
    console.error("Failed to update todo", error);
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// POST /todos - Create a new todo
app.post("/todos", async (req, res) => {
  try {
    const { text } = req.body;
    const todo = new Todo({ text });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    console.error("Failed to create todo", error);
    res.status(500).json({ error: "Failed to create todo" });
  }
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Todo API server is running on port ${process.env.PORT}`);
});
