const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/chat-test'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/chat-test/index.html'));
});

app.get('/exercises', (req, res) => {
    res.json({ data: 'Hello World!' });
})

app.listen(process.env.PORT || 8080);