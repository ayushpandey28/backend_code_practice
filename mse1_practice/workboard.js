const express = require("express");

const app = express();

app.use(express.json());

const tasks = [];
let nextId = 1;

const validStatuses = ["pending", "in-progress", "completed"];

// GET all tasks
app.get("/api/tasks", (req, res) => {
    res.status(200).json({
        tasks: tasks
    });
});

// POST create task
app.post("/api/tasks", (req, res) => {
    const { title, status } = req.body;

    if (title === undefined || !validStatuses.includes(status)) {
        return res.status(400).json({
            message: "Please provide valid task details"
        });
    }

    const task = {
        id: nextId++,
        title: title,
        status: status
    };

    tasks.push(task);

    res.status(201).json(task);
});

// PATCH update task
app.patch("/api/tasks/:id", (req, res) => {
    const task = tasks.find(
        p => p.id === Number(req.params.id)
    );

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const { title, status } = req.body;

    if (status !== undefined && !validStatuses.includes(status)) {
        return res.status(400).json({
            message: "Please provide valid task details"
        });
    }

    if (title !== undefined) {
        task.title = title;
    }

    if (status !== undefined) {
        task.status = status;
    }

    res.status(200).json(task);
});

// DELETE task
app.delete("/api/tasks/:id", (req, res) => {
    const index = tasks.findIndex(
        p => p.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    tasks.splice(index, 1);

    res.status(200).json({
        message: "Task deleted successfully"
    });
});

// GET tasks by status
app.get("/api/tasks/status/:status", (req, res) => {
    const filteredTasks = tasks.filter(
        task => task.status === req.params.status
    );

    res.status(200).json(filteredTasks);
});

app.listen(8000);