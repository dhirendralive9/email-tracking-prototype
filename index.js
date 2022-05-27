const express = require("express");
const app = express();

app.set('view engine','ejs');
app.set('trust proxy', true)

app.get('/',(req,res)=>{
    res.send("This is working")
    console.log(req.headers['user-agent']);
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    console.log(req.ip);
});

app.get('/demo',(req,res)=>{
    res.render('index.ejs');
})

app.listen(4500,()=>{
 console.log("app is working on port 4500");
})