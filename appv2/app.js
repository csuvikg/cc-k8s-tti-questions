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

app.listen(port, () => {
    console.log(`Current hostname: ${os.hostname()}`);
    console.log(`Server port: ${port}`);
});

process.on('SIGINT', () => {
    console.log("\nGracefully shutting down...");
    server.close();
    process.exit(0);
});
