'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });

const tasks = [];

router.get('/', (req, res) => {

    res.send(tasks);
});

router.post('/', (req, res) => {

    const { name, desc } = req.body;

    if (name && desc) {

        const id = tasks.length === 0 ? 1 : tasks[tasks.length - 1].id + 1;

        const task = { id, name, desc };
        tasks.push(task);

        res.status(201).send(task);
        return;
    }

    res.sendStatus(400);
});

router.put('/:taskId', (req, res) => {

    const { taskId } = req.params;
    const { name, desc } = req.body;

    if (name && desc) {
        const id = parseInt(taskId);
        const task = tasks.find(task => task.id === id);
        if (task) {
            const index = tasks.findIndex(task => task.id === id);
            tasks.splice(index, 1);
            const newTask = { id, name, desc };
            tasks.push(newTask);

            res.status(200).send(newTask);
            return;
        }

        res.sendStatus(404);
        return;
    }

    res.sendStatus(400);
});

router.delete('/:taskId', (req, res) => {

    const { taskId } = req.params;

    if (taskId) {
        const id = parseInt(taskId);
        const task = tasks.find(task => task.id === id);
        if (task) {
            const index = tasks.findIndex(task => task.id === id);
            tasks.splice(index, 1);

            res.sendStatus(200);
            return;
        }

        res.sendStatus(404);
        return;
    }

    res.sendStatus(400);
});

module.exports = router;
