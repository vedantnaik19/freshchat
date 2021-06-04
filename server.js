const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/chat-test'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/chat-test/index.html'));
});

app.get('/exercises', (req, res) => {
    res.json({ data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. \nLorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. \nIt has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.' });
})

app.listen(process.env.PORT || 8080);