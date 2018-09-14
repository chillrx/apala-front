// server.js
const express = require('express');
const http = require('http');
const path = require('path');

// const api = require('./server/routes/api');
const app = express();

app.use(express.static(path.join(__dirname, 'dist/apala')));

app.get('*', (req, res)=> {
  res.sendFile(path.join(__dirname, 'dist/apala/index.html'));
});

const port = process.env.PORT || '3001';

const server = http.createServer(app);

server.listen(port, () => console.log(`Running`));
