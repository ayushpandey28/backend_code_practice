const express = require("express");

const app = express();
app.use(express.json());

const events = [
    {
        id: 1,
        name: "Node.js Workshop",
        registrationCount: 0
    },
    {
        id: 2,
        name: "React Workshop",
        registrationCount: 0
    }
];

app.get("/api/events",(req,res)=>{
    res.status(200).json({
        message:"Events retrieved successfully",
        events:events
    });
});

app.post("/api/register",(req,res)=>{
    const {eventId}=req.body;
    if(eventId===undefined){
        return res.status(400).json({
            message:"eventId is required"
        });
    }
    const event=events.find(p=>p.id===Number(eventId));
    if(!event){
        return res.status(404).json({
            message:"Event not found"
        }); 
    }
    event.registrationCount++;
    res.status(200).json({
        message: "Registration successful",
        event: event
    });
});

app.get("/api/events/:id",(res,req)=>{
    const event=events.find(p=>p.id===Number(req.params.id));
    if(!event){
        return req.status(404).json({
            message:"Event not found",
        });
    }
    res.status(200).json({
        event:event
    });
    
});
app.post("/api/cancel",(req,res)=>{
    const {eventId}=req.body;
    if(eventId===undefined){
        return res.status(400).json({
            message:"eventId is required"
        });
    }
    const event=events.find(p=>p.id===Number(eventId));
    if(!event){
        return res.status(404).json({
            message:"Event not found"
        });
    }
    if(event.registrationCount>0){
        event.registrationCount--;
    }
    res.status(200).json(event);
})
