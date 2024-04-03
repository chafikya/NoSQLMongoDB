const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User'); // Import User model correctly
const Message = require('../models/Message.js');
const { secretKey } = require('../routes/config.js');

// GET request to the root URL
router.get('/', (req, res) => {
    res.send('Hello World');
});


// POST request to create a new message
router.post('/messages', async (req, res) => {
    const { sender, recipient, content } = req.body;

    try {
        const newMessage = new Message({ sender, recipient, content });
        const savedMessage = await newMessage.save();
        await savedMessage.populate('sender', 'name').populate('recipient', 'name').execPopulate();

        // Renvoyer le message enregistré avec les informations de l'expéditeur et du destinataire
        res.status(201).json({
          _id: savedMessage._id,
          sender: savedMessage.sender.name,
          recipient: savedMessage.recipient.name,
          content: savedMessage.content,
          createdAt: savedMessage.createdAt
        });
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// GET request to retrieve messages for a conversation between two users
router.get('/messages', async (req, res) => {
    const { senderId, recipientId } = req.query;

    try {
        // Récupérer uniquement les messages entre deux utilisateurs spécifiés
        const messages = await Message.find({
          $or: [
            { sender: senderId, recipient: recipientId },
            { sender: recipientId, recipient: senderId }
          ]
        }).populate('sender', 'name').populate('recipient', 'name');

        // Construire et envoyer une réponse avec les détails de l'utilisateur pour chaque message
        const detailedMessages = messages.map(message => ({
            _id: message._id,
            sender: message.sender.name,
            senderId: message.sender._id, // Add this line to include the sender's ID
            recipient: message.recipient.name,
            content: message.content,
            createdAt: message.createdAt
          }));

        res.json(detailedMessages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




// POST request to sign up a new user
router.post('/signup', async (req, res) => {
    const { name, surname, phone, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "The email is already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, surname, phone, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ _id: newUser._id }, secretKey);
        res.status(201).json({ token });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error creating the user' });
    }
});

// Route handler to fetch all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, {  name: 1, surname: 1, email:1 });
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/user/id', verifyToken, (req, res) => {
    // Assuming verifyToken middleware decodes the token and sets req.userId
    if (req.userId) {
      res.json({ userId: req.userId });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Email not found" });
        }

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // If the passwords match, generate a JWT token
        const token = jwt.sign({ _id: user._id }, secretKey);
        res.status(200).json({ token });

    } catch (error) {
        console.error(error); // Log the actual error for debugging
        res.status(500).json({ message: 'An error occurred during sign-in' });
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