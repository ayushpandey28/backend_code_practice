const express = require("express");
const app = express();
app.use(express.json());
const urls=[];
let nextId=1;
app.post("/api/shorten",(req,res)=>{
    const {username,originalUrl}=res.body;
    if(username===undefined || originalUrl===undefined){
        return res.statusCode(400).json({
            message: "username and originalUrl are required"
        });
    }

    try{
        new URL(originalUrl);
    }catch{
        return res.status(400).json({
            message:"Invalid URL"
        });
    }
    const code=generateCode();
    const link={
        id: nextId++,
        username:username,
        originalUrl:originalUrl,
        code:code
    };
     urls.push(link);

    res.status(201).json({
        message: "URL shortened successfully",
        code: code
    });
});

app.get("/api/url/:code",(req,res)=>{
    const link=urls.find(p=>p.code===req.params.code);
    if(!urls){
        return res.status(404).json({
            message:"URL not found"
        });
    }
    res.status(200).json({
        originalUrl:link.originalUrl,
        createor:link.username
    });
});

app.get("/api/users/:username/urls",)