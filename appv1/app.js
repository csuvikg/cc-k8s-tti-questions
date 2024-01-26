const os = require('os');
const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send(`Hello from ${os.hostname()}!`);
});

const server = app.listen(port, () => {
    console.log(`Current hostname: ${os.hostname()}`);
    console.log(`Server port: ${port}`);
});

process.on('SIGINT', () => {
    console.log("\nGracefully shutting down...");
    server.close();
    process.exit(0);
});
