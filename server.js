const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiYXBpI"
    +"l0sImNsaW5pY0lkIjoyLCJ1c2VyX25hbWUiOiJkb2N0b3JAZ21haWwuY29tIiwic2NvcGUiOls"
    +"icmVhZCIsIndyaXRlIl0sImV4cCI6MTYyNDI2NjM5MCwidXNlcklkIjozLCJhdXRob3JpdGllcy"
    +"I6WyJET0NUT1IiXSwianRpIjoiOThkNDEyZTMtMzQwZC00YTM1LWI2MGYtZTY3YTI4ZjViNjYyIi"
    +"wiY2xpZW50X2lkIjoiYW5kcm9pZC1hcHAifQ.igVdXXlz9hrIB9AvHJyt1ZltKlWK_7NF8oIbjuFT2Zg";

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/chat-test'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/src/index.html'));

});

app.get('/plan/exercise', async (req, res) => {
    const plan = (await axios.get("http://15.206.230.180/apis/v1/exercise/plan?patient_id=1697", {headers: {Authorization:`Bearer ${accessToken}`}})).data;
    for(let i=0;i<plan.data.plan.length;i++){
        for(let j=0;j<plan.data.plan[i].exercises.length;j++){
            
            plan.data.plan[i].exercises[j].image_url = "https://images.pexels.com/photos/2294354/pexels-photo-2294354.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=200";
        }
    }
    const exercises = plan.data.plan.flatMap(planSlice => planSlice.exercises.map(exercise => exercise[req.query.property]));
    exercises.push('');
    res.send({data: exercises.join(',')});
})

app.get('/bodyParts', (req, res) => {
    const bodyParts = [
        'Knee',
        'Shoulder',
        'Hip',
        'Ankle',
        '',
        ''
    ]
    return res.send({data: bodyParts.join(',')});
})

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
  
  </div>
  
    ` });
})

app.listen(process.env.PORT || 8080);