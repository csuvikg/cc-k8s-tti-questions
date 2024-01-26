const os = require('os');
const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send(`Hello from ${os.hostname()}!`);
});

// Endpoint to allocate memory
app.get('/alloc', (req, res) => {
    const size = parseInt(req.query.size, 10);
    if (!size) {
        return res.status(400).send('Please specify a size parameter.');
    }

    try {
        const memoryHog = new Array(size * 1024 * 1024);
        memoryHog.fill(0);
        res.send(`Allocated ${size} MB of memory`);
    } catch (e) {
        res.status(500).send('Error allocating memory');
    }
});

// Variable to keep track of readiness and healthiness
let isReady = false;
let isHealthy = true;
const startupTime = parseInt(process.env.STARTUP_TIME || '30', 10) * 1000; // Default to 30 seconds if not set
const timeoutTime = parseInt(process.env.TIMEOUT_TIME || '60', 10) * 1000; // Default to 60 seconds if not set

// Set readiness to true after the given startup time
setTimeout(() => {
    isReady = true;
}, startupTime);

// Set healthiness to false after the given timeout time
setTimeout(() => {
    isHealthy = false;
}, timeoutTime);

// Readiness check endpoint
app.get('/ready', (req, res) => {
    if (isReady) {
        res.status(200).send('Ready');
    } else {
        res.status(503).send('Not Ready');
    }
});

// Liveness check endpoint
app.get('/health', (req, res) => {
    if (isHealthy) {
        res.status(200).send('Healthy');
    } else {
        res.status(500).send('Not Healthy');
    }
});

app.listen(port, () => {
    console.log(`Current hostname: ${os.hostname()}`);
    console.log(`Server port: ${port}`);
});

process.on('SIGINT', () => {
    console.log("\nGracefully shutting down...");
    server.close();
    process.exit(0);
});
