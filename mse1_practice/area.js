const express = require("express");

const app = express();
app.use(express.json());

app.post("/api/area",(req,res)=>{
    const {shape,radius,length,width,side}=req.body;
    if(shape!=="circle"&&shape!=="rectangle"&&shape!=="square"){
        return res.status(400).json({
             message: "Please provide valid input"
        });
    }
    if(shape==="circle"){
        if(typeof radius!=="number"||radius<=0){
            return res.status(400).json({
                message:"Please provide valid input"
            });
        }
        const a1=Math.PI*radius*radius;
        res.status(200).json(a1);

    }
    if(shape==="rectangle"){
        if(typeof length!=="number"||typeof width!=="number"||length<=0||width<=0){
         return res.status(400).json({
                message:"Please provide valid input"
            });
        }
            const a2=length*width;
            res.status(200).json(a2);
    }
     if(shape==="square"){
        if(typeof side!=="number"||side<=0){
         return res.status(400).json({
                message:"Please provide valid input"
            });
        }
          
            const a3=side*side;
            res.status(200).json(a3);
    }
    

});
app.listen(8000);