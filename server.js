const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

app.use(express.json());

// Endpoint to save user data
app.post('/api/saveUser', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'public', 'users.json');
    await fs.writeFile(filePath, JSON.stringify({ users: req.body.users }, null, 2));
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).json({ error: 'Failed to save user data' });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
}); 