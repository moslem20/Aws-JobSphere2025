const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to handle JSON requests
app.use(express.json());

// Load mock data
const mockDataPath = path.join(__dirname, 'mock-data.json');
const mockData = JSON.parse(fs.readFileSync(mockDataPath, 'utf-8'));

// Endpoint to get users
app.get('/api/users', (req, res) => {
    res.json(mockData.users);
});

// Endpoint to get interview questions based on role
app.get('/api/interview-questions/:role', (req, res) => {
    const role = req.params.role;
    const questions = mockData.interview_questions.find(q => q.role.toLowerCase() === role.toLowerCase());
    if (questions) {
        res.json(questions);
    } else {
        res.status(404).json({ message: 'Role not found' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Mock server running at http://localhost:${PORT}`);
});