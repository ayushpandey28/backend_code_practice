const express = require("express");

const app = express();
app.use(express.json());

app.post("/api/compound-interest",(req,res)=>{
    const {principal,rate,time}=req.body;
    if(principal===undefined||rate===undefined||time===undefined){
        return res.status(400).json({
            message:"please provide valid input"
        });
    }
    if(typeof principal!=="number"||typeof rate !=="number"||typeof time!=="number"||principal<=0||rate<=0||time<=0){
        return res.status(400).json({
            message:"Please provide valid input"
        });
    }
    const CI=principal*(1+rate/100)**time-principal;
    res.status(200).json(CI);

});
app.listen(8000);