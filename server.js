const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Load predictions
const predictionsFilePath = path.join(__dirname, 'predictions.json');
if (!fs.existsSync(predictionsFilePath)) {
    fs.writeFileSync(predictionsFilePath, JSON.stringify([]));
}

// Get all predictions
app.get('/predictions', (req, res) => {
    const predictions = JSON.parse(fs.readFileSync(predictionsFilePath));
    res.json(predictions);
});

// Add a new prediction
app.post('/predictions', (req, res) => {
    const { name, date, time } = req.body;
    if (!name || !date || !time) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const predictions = JSON.parse(fs.readFileSync(predictionsFilePath));
    predictions.push({ name, date, time });
    fs.writeFileSync(predictionsFilePath, JSON.stringify(predictions, null, 2));

    res.json({ message: 'Prediction added successfully!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});