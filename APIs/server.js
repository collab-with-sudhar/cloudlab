const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies in requests
app.use(express.json());

// -------------------------------------------------------------------
// Simple Data Store (Array of Objects)
// -------------------------------------------------------------------

let items = [
    { id: 1, name: 'Apple', description: 'A red fruit.' },
    { id: 2, name: 'Banana', description: 'A yellow fruit.' },
    { id: 3, name: 'Carrot', description: 'An orange vegetable.' }
];

let nextId = items.length + 1; // Used for new item IDs

// -------------------------------------------------------------------
// CRUD Operations
// -------------------------------------------------------------------

// 1. CREATE (POST) - Add a new item
app.post('/items', (req, res) => {
    const newItem = {
        id: nextId++,
        name: req.body.name,
        description: req.body.description
    };

    if (!newItem.name || !newItem.description) {
        return res.status(400).json({ error: 'Name and description are required.' });
    }

    items.push(newItem);
    res.status(201).json(newItem); // 201 Created
});

// 2. READ All (GET) - Get all items
app.get('/items', (req, res) => {
    res.json(items);
});

// 3. READ One (GET) - Get a single item by ID
app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(item => item.id === id);

    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ error: 'Item not found.' });
    }
});

// 4. UPDATE (PUT) - Update an existing item by ID
app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const itemIndex = items.findIndex(item => item.id === id);

    if (itemIndex > -1) {
        // Update the item
        items[itemIndex] = {
            ...items[itemIndex], // Keep existing properties
            name: req.body.name || items[itemIndex].name, // Use new name or existing
            description: req.body.description || items[itemIndex].description // Use new description or existing
        };
        res.json(items[itemIndex]);
    } else {
        res.status(404).json({ error: 'Item not found.' });
    }
});

// 5. DELETE (DELETE) - Delete an item by ID
app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = items.length;

    // Filter out the item with the given ID
    items = items.filter(item => item.id !== id);

    if (items.length < initialLength) {
        res.status(204).send(); // 204 No Content (Successful deletion)
    } else {
        res.status(404).json({ error: 'Item not found.' });
    }
});

// -------------------------------------------------------------------
// Start Server
// -------------------------------------------------------------------

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});