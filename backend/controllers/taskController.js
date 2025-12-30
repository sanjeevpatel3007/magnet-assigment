const Task = require('../models/Task');
const User = require('../models/User');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
    const { title, description, dueDate, priority, assignedTo } = req.body;

    try {
        const task = await Task.create({
            title,
            description,
            dueDate,
            priority,
            assignedTo,
            createdBy: req.user._id,
            status: 'pending' // Default status
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
    const pageSize = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const status = req.query.status;
    const priority = req.query.priority;

    const keyword = {};

    // Filter by status if provided
    if (status) {
        keyword.status = status;
    }

    // Filter by priority if provided
    if (priority) {
        keyword.priority = priority;
    }

    // Filter based on role
    if (req.user.role !== 'admin') {
        keyword.assignedTo = req.user._id;
    }

    try {
        const count = await Task.countDocuments({ ...keyword });
        const tasks = await Task.find({ ...keyword })
            .populate('assignedTo', 'username')
            .populate('createdBy', 'username')
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort({ createdAt: -1 });

        res.json({ tasks, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate('assignedTo', 'username')
            .populate('createdBy', 'username');

        if (task) {
            // Check permission: Admin or Assigned User or Creator
            if (
                req.user.role === 'admin' ||
                task.assignedTo._id.toString() === req.user._id.toString() ||
                task.createdBy._id.toString() === req.user._id.toString()
            ) {
                res.json(task);
            } else {
                res.status(403).json({ message: 'Not authorized to view this task' });
            }
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (task) {
            // Check permission
            if (
                req.user.role === 'admin' ||
                task.assignedTo.toString() === req.user._id.toString() ||
                task.createdBy.toString() === req.user._id.toString()
            ) {
                task.title = req.body.title || task.title;
                task.description = req.body.description || task.description;
                task.dueDate = req.body.dueDate || task.dueDate;
                task.status = req.body.status || task.status;
                task.priority = req.body.priority || task.priority;

                // Only admin can reassign? Or creator? Let's say Admin or Creator can reassign.
                if (req.body.assignedTo && (req.user.role === 'admin' || task.createdBy.toString() === req.user._id.toString())) {
                    task.assignedTo = req.body.assignedTo;
                }

                const updatedTask = await task.save();
                res.json(updatedTask);
            } else {
                res.status(403).json({ message: 'Not authorized to update this task' });
            }
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (task) {
            // Check permissions: Admin or Creator (Usually users can't delete assigned tasks unless configured)
            // Let's allow Admin and Creator to delete.
            if (
                req.user.role === 'admin' ||
                task.createdBy.toString() === req.user._id.toString()
            ) {
                await task.deleteOne(); // or task.remove() depending on mongoose version
                res.json({ message: 'Task removed' });
            } else {
                res.status(403).json({ message: 'Not authorized to delete this task' });
            }
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
