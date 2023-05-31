// TODO API with CURD operations
// Data is stored temporarily in memory

require("dotenv").config(); // for .env file
const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid"); //for unique id

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json()); // can also use: app.use(express.json());

// Mock data for initial todos
let todos = [
  { id: 1, text: "Summer", completed: true },
  { id: 2, text: "Build an API", completed: false },
];

// GET /todos - Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// GET /todo/:id - Get a single todo
app.get("/todos/:id", (req, res) => {
  const todoId = req.params.id;
  const todo = todos.find((todo) => todo.id == todoId);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

// POST /todos - Create a new todo
app.post("/todos", (req, res) => {
  const newTodo = {
    id: uuidv4(),
    text: req.body.text,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /todos/:id - Update a todo
app.put("/todos/:id", (req, res) => {
  const todoId = req.params.id;
  const updatedTodo = req.body;
  todos = todos.map((todo) =>
    todo.id == todoId ? { ...todo, ...updatedTodo } : todo
  );
  res.json(updatedTodo);
});

// DELETE /todos/:id - Delete a todo
app.delete("/todos/:id", (req, res) => {
  const todoId = req.params.id;
  todos = todos.filter((todo) => todo.id != todoId);
  res.sendStatus(204);
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Todo API server is running on port ${process.env.PORT}`);
});
