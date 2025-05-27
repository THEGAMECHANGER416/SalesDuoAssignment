const express = require('express');
const app = express();
const port = 3000;

const processMeetingRoutes = require('./src/routes/processMeetingRoute');

// Middleware to parse text/plain
app.use(express.text());

// Add routers
app.use('/', processMeetingRoutes);

// Listener
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
