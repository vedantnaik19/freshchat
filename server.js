const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/chat-test'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/chat-test/index.html'));

});

app.get('/exercises', (req, res) => {
    res.json({ data: `
    <div style="overflow: auto;
  white-space: nowrap;">
  <img src="https://images.pexels.com/photos/6331085/pexels-photo-6331085.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=100&w=200" alt="Girl in a jacket" width="150" height="150">
  <img src="https://images.pexels.com/photos/6331085/pexels-photo-6331085.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=100&w=200" alt="Girl in a jacket" width="150" height="150">
  <img src="https://images.pexels.com/photos/6331085/pexels-photo-6331085.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=100&w=200" alt="Girl in a jacket" width="150" height="150">
  <img src="https://images.pexels.com/photos/6331085/pexels-photo-6331085.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=100&w=200" alt="Girl in a jacket" width="150" height="150">
  <img src="https://images.pexels.com/photos/6331085/pexels-photo-6331085.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=100&w=200" alt="Girl in a jacket" width="150" height="150">
  <img src="https://images.pexels.com/photos/6331085/pexels-photo-6331085.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=100&w=200" alt="Girl in a jacket" width="150" height="150">
  <img src="https://images.pexels.com/photos/6331085/pexels-photo-6331085.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=100&w=200" alt="Girl in a jacket" width="150" height="150">
  </div>
    ` });
})

app.listen(process.env.PORT || 8080);