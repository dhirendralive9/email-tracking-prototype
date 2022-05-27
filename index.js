const express = require('express');
const app = express();
const fs = require('fs');
const platform = require('platform');
var report = [];
var user;

fs.readFile('./public/track.json',(err, data)=>{
    err => console.log(err);
    report = JSON.parse(data);
    
})

app.use(express.static('public'))
app.set('view engine','ejs');
app.set('trust proxy', true)

app.get('/',(req,res)=>{
    res.send("This is working")
    user = platform.parse(req.headers['user-agent']);
    console.log(user)
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    console.log(req.ip);
});

app.get('/demo',(req,res)=>{
    res.render('index.ejs');
})

app.listen(4500,()=>{
 console.log("app is working on port 4500");
})