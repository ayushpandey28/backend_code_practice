// const express = require('express');
// const app = express();
// app.get('/', (req, res) => {
//     res.end("Hello Express");
// });
// app.get('/about', (req, res) => {
//     res.end("Hello Ayush");
// });
// app.listen(3030, () => {
//     console.log('Server started');
// });


import express from 'express' //const express=require('express)
const app =express()
const PORT = 8000
app.use(express.json())
let students=[{
    id:1,
    name:"Ayush",
    age:20
},
{
    id:2,
    name:"Pandey",
    age:21
}]
//reqesting all resources from server
app.get('/students',(req,res)=>{
    res.json(students) // sending response in JSOn format
})
app.get("/students/:id",(req,res)=>{
    const id=parseInt(req.params.id)
    const student=students.find(student=>student.id===id)
    if(!student){
        return res.status(404).json({
            message:"Student not found"
        })
    }
    res.json(student)
})
app.post('/student',(req,res)=>{
    const newStudent={
        id:students.length+1,
        name:req.body.name,
        age:req.body.age,
        course:req.body.course
    }
    students.push(newStudent)
    res.status(201).json({
        message:"Student created",
        student:newStudent
    })
})
app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    students = students.filter(student => student.id !== id);
    res.json(students);
});
app.listen(PORT,()=>{console.log("Server started")})



