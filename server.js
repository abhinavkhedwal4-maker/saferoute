// server.js
// This is the backend server using Express (a Node.js framework)

// Load the express package
const express = require('express');

// Load the cors package — allows frontend to talk to backend
const cors = require('cors');

// Load path — helps us point to files correctly
const path = require('path');

// Create the express app
const app = express();

// Set the port (use environment variable or default to 3000)
const PORT = process.env.PORT || 3000;

// ── MIDDLEWARE ──
// Enable CORS (allows frontend to call backend)
app.use(cors());

// Parse JSON bodies (for when frontend sends data)
app.use(express.json());

// Serve all frontend files (index.html, style.css, app.js) statically
// This means visiting http://localhost:3000 shows index.html automatically
app.use(express.static(path.join(__dirname)));

// ── API ROUTE 1: Health Check ──
// Visit http://localhost:3000/api/health to check server is running
app.get('/api/health', (req, res) => {
  res.json({ status: 'SafeRoute server is running ✅' });
});

// ── API ROUTE 2: Safety Score ──
// Frontend can call this to get a safety score from the backend
// POST /api/safety with body: { location: "Koramangala", time: "night" }
app.post('/api/safety', (req, res) => {

  // Extract location and time from the request body
  const { location, time } = req.body;

  // For now, return a mock score
  // Later you can connect this to a real database
  const mockScores = {
    night: Math.floor(Math.random() * 40) + 30,  // 30–70 at night
    day: Math.floor(Math.random() * 30) + 60      // 60–90 in day
  };

  res.json({
    location: location,
    time: time,
    score: mockScores[time] || 60,
    message: 'Mock safety score — connect real data later'
  });
});

// ── START THE SERVER ──
app.listen(PORT, () => {
  console.log(`✅ SafeRoute server running at http://localhost:${PORT}`);
});