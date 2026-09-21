const express = require("express");

const app = express();
app.use(express.json());

app.post("/api/simple-interest",(req,res)=>{
    const {principal,rate,time}=req.body;
    if(principal===undefined || rate===undefined || time===undefined){
        return res.status(400).json({
            message:"Please provide valid input"
        });
    }
    if(principal<=0 || rate<=0 || time<=0 ||typeof principal !== "number" ||typeof rate !=="number" || typeof time!=="number"){
        return res.status(400).json({
            message:"Please provide valid input"
        });
    }
    const SI=(principal*rate*time)/100;

    res.status(200).json(SI);
});