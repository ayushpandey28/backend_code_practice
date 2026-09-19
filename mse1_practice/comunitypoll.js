const express= require("express")
const app=express()
app.use(express.json())

const polls=[
    {
        id: 1,
        question: "What is your favorite language?",
        choices: [
            { id: 1, text: "JavaScript", votes: 0 },
            { id: 2, text: "Python", votes: 0 },
            { id: 3, text: "Java", votes: 0 }
        ]
    },
    {
        id: 2,
        question: "Which OS do you use?",
        choices: [
            { id: 1, text: "Windows", votes: 0 },
            { id: 2, text: "Linux", votes: 0 },
            { id: 3, text: "MacOS", votes: 0 }
        ]
    }
];

//get all poles
app.get("/api/polls",(req,res)=>{
    res.status(200).json({
        message:"Polls retrieved successfully",
        polls:polls

    });
});

//get single poll

app.get("/api/polls/:id",(req,res)=>{
    const id=Number(req.params.id);
    const poll=polls.find(p=>p.id===id);
    if(!poll){
        return res.status(404).json({
            message:"Poll not found"
        });
    }
    res.status(200).json(poll);
});

//post the vote
app.post("/api/vote",(req,res)=>{
    const {pollId,optionId}=req.body;
    if(!pollId || !optionId){
        return res.status(400).json({
            message:"pollId and optionId are required"
        });
    }
    const poll=polls.find(p=>p.id===Number(pollId));
    if(!poll){
        return res.status(404).json({
            message:"Poll not found"
        });
    }
    const option=poll.options.find(
        choice=>choice.id===Number(optionId)
    );
    if(!option){
        return res.status(400).json({
            message:"Invalid option"
        });
    }
    option.vote++;
    req.status(200).json(option);
})

//get result

app.get("/api/polls/:id/rresults",(req,res)=>{
    const poll=polls.find(p=>p.id===Number(req.params.id));
    if(!poll){
        return res.status(404).json({
            message:"Poll not found"
        });

}

});