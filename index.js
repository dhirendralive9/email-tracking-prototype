const express = require('express');
const app = express();
const fs = require('fs');
const platform = require('platform');
const date = require('date-and-time');
var report = [];
var user;
var port = 5000;

fs.readFile('./public/track.json',(err, data)=>{
    err => console.log(err);
    report = JSON.parse(data);
    
})

app.use(express.static('public'))
app.set('view engine','ejs');
app.set('trust proxy', true)

app.get('/',(req,res)=>{
    res.send("Open Email Tracking");
})

app.get('/image',(req,res)=>{
    res.send("This is working")
    user = platform.parse(req.headers['user-agent']);
    
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    
    var newData = {"ip":ip,"description":user.description,"browser":user.name,"os":user.os.family,"version":user.os.version,"date":`${date.format(new Date(), 'YYYY/MM/DD')}`,"time":`${date.format(new Date(), 'HH:mm:ss')}`};
    report.push(newData);
    fs.writeFile(`./public/track.json`,JSON.stringify(report),(err)=> console.log(err));
   
});

app.get('/demo',(req,res)=>{
    res.render('index.ejs');
})

app.get('/fetch',(req,res)=>{
    res.json(...report);
})

app.listen(port,()=>{
 console.log("app is working on port:",port);
})