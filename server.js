const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/chat-test'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/chat-test/index.html'));

});

app.get('/exercises', (req, res) => {
  res.json({
    data: `
    <div style="   
    height: 300px;
    display: flex;
    align-items: center;
    overflow: auto;
  ">
  
  <div style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    padding: 8px;
    background-color: white;
    width: 200px;">
    <img src="https://images.pexels.com/photos/2294354/pexels-photo-2294354.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100" style="width:100%">
    <div style="
    top: 8px;
    left: 16px;
    border-radius: 14px;
    font-size: 18px;"><b>1.</b></div>
    <div style="padding: 8px 8px; height: 100px; overflow: hidden">Balance, half kneeling, with trunk rotation/extension, with weights, on wobble cushion</div>
  </div>
  
  
  
  <div style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    padding: 8px;
    background-color: white;
    width: 200px;">
    <img src="https://images.pexels.com/photos/2294354/pexels-photo-2294354.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100" style="width:100%">
    <div style="
    top: 8px;
    left: 16px;
    border-radius: 14px;
    font-size: 18px;"><b>1.</b></div>
    <div style="padding: 8px 8px; height: 100px; overflow: hidden">Balance, half kneeling, with trunk rotation/extension, with weights, on wobble cushion</div>
  </div>
  
  
  
  <div style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    padding: 8px;
    background-color: white;
    width: 200px;">
    <img src="https://images.pexels.com/photos/2294354/pexels-photo-2294354.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100" style="width:100%">
    <div style="
    top: 8px;
    left: 16px;
    border-radius: 14px;
    font-size: 18px;"><b>1.</b></div>
    <div style="padding: 8px 8px; height: 100px; overflow: hidden">Balance, half kneeling, with trunk rotation/extension, with weights, on wobble cushion</div>
  </div>
  
  <div style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    padding: 8px;
    background-color: white;
    width: 200px;">
    <img src="https://images.pexels.com/photos/2294354/pexels-photo-2294354.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100" style="width:100%">
    <div style="
    top: 8px;
    left: 16px;
    border-radius: 14px;
    font-size: 18px;"><b>1.</b></div>
    <div style="padding: 8px 8px; height: 100px; overflow: hidden">Balance, half kneeling, with trunk rotation/extension, with weights, on wobble cushion</div>
  </div>
  
  </div>
  
    ` });
})

app.listen(process.env.PORT || 8080);