const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

let objects = [];

// Ендпоінт для додавання об'єкта
app.post('/add-object', (req, res) => {
    const newObj = req.body;
    objects.push(newObj);
    res.status(200).json({ message: 'Object added successfully', objects });
});

// Ендпоінт для отримання всіх об'єктів
app.get('/get-objects', (req, res) => {
    res.json(objects);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
