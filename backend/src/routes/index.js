// routes/index.js
const { Router } = require('express');
const router = Router();

const mongoose = require('mongoose');
const path = require('path');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Hello World'))

const bcrypt = require('bcrypt');
const saltRounds = 10; // Vous pouvez augmenter pour plus de sécurité

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        console.log("Email reçu :", email);
        const existingUser = await User.findOne({ email });
        console.log("Utilisateur existant :", existingUser);
        if (existingUser) {
            return res.status(400).json({ message: "L'email est déjà utilisé" });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        const token = jwt.sign({ _id: newUser._id }, 'secretkey');
        res.status(201).json({ token });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Erreur lors de la création de l’utilisateur' });
    }
});


router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Email non trouvé" });
        }

        // Comparer le mot de passe fourni avec le mot de passe haché
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        // Créer un token JWT
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erreur de serveur' });
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const Task = require('../models/Task');

// routes/index.js
router.get('/private-tasks', verifyToken, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.userId }); // Update the field to 'user'

        res.json(tasks);
    } catch (error) {
        console.error('Error fetching private tasks:', error);
        res.status(500).json({ error: 'Erreur de serveur' });
    }
});

const multer = require('multer');
const storage = multer.memoryStorage(); // Use memory storage for handling file in memory
const upload = multer({ storage: storage });

router.post('/private-tasks', verifyToken, upload.single('taskImage'), async (req, res) => {
    const { name, description, date } = req.body;
    const image = req.file ? req.file.buffer.toString('base64') : null;

    try {
        const newTask = new Task({
            name,
            description,
            date,
            image, // Assign the base64-encoded image data
            user: req.userId // Assign the user reference
        });

        await newTask.save();

        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error adding private task:', error);
        res.status(500).json({ error: 'Erreur de serveur' });
    }
});


router.delete('/private-tasks/:taskId', verifyToken, async (req, res) => {
    try {
        const taskId = req.params.taskId;
        console.log('Task ID to remove:', taskId);
        const removedTask = await Task.deleteOne({ _id: taskId });

        if (removedTask.deletedCount > 0) {
            res.json({ message: 'Private task removed successfully' });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        console.error('Error removing private task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

function verifyToken(req, res, next) {
    
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized Request');
    }

    const token = req.headers.authorization.split(' ')[1];

    if (token === 'null') {
        return res.status(401).send('Unauthorized token');
    }

    try {
        const payload = jwt.verify(token, 'secretkey');
        console.log(payload);
        req.userId = payload._id; 
        next();
    } catch (error) {
        return res.status(401).send('Invalid token');
    }
    
}

module.exports = router;