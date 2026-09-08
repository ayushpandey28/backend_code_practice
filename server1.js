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

// import express from 'express'
// const app = express()
// const PORT = 8000
// // Middleware
// app.use(express.json())
// // Students data
// let students = [
//     {
//         id: 1,
//         name: "Ayush",
//         age: 20,
//         course: "CSE"
//     },
//     {
//         id: 2,
//         name: "Pandey",
//         age: 21,
//         course: "IT"
//     }
// ]
// // GET - Get all students
// app.get('/students', (req, res) => {
//     res.json(students)
// })
// // GET - Get student by ID
// app.get('/students/:id', (req, res) => {
//     const id = parseInt(req.params.id)
//     const student = students.find(student => student.id === id)
//     if (!student) {
//         return res.status(404).json({
//             message: "Student not found"
//         })
//     }
//     res.json(student)
// })
// // POST - Create a new student
// app.post('/students', (req, res) => {
//     const { name, age, course } = req.body
//     if (!name || !age || !course) {
//         return res.status(400).json({
//             message: "Name, age and course are required"
//         })
//     }
//     const newStudent = {
//         id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
//         name: name,
//         age: age,
//         course: course
//     }
//     students.push(newStudent)
//     res.status(201).json({
//         message: "Student created successfully",
//         student: newStudent
//     })
// })
// // DELETE - Delete student
// app.delete('/students/:id', (req, res) => {
//     const id = parseInt(req.params.id)
//     const student = students.find(student => student.id === id)
//     if (!student) {
//         return res.status(404).json({
//             message: "Student not found"
//         })
//     }
//     students = students.filter(student => student.id !== id)
//     res.json({
//         message: "Student deleted successfully",
//         student: student
//     })
// })
// app.put('/students/:id', (req, res) => {
//     const id = parseInt(req.params.id)
//     const student = students.find(student => student.id === id)
//     if (!student) {
//         return res.status(404).json({
//             message: "No record found"
//         })
//     }
//     student.name = req.body.name
//     student.age = req.body.age
//     student.course = req.body.course
//     res.json(student)
// })
// //reading data on the basis of filter 
// app.get('/search', (req, res) => {
//     const course = req.query.course
//     const age = parseInt(req.query.age)
//     const stud = students.filter(s =>s.course.toLowerCase() === course.toLowerCase() && s.age === age
//     )
//     res.json(stud)
// })
// // Start server
// app.listen(PORT, () => {
//     console.log(`Server started on http://localhost:${PORT}`)
// })



const express=require('express') //const express=require('express')
const app=express() //http.createserver equivalent to this
app.use(express.urlencoded({ extended: true })); // we create a middleware so that data is written in json

const studentRoutes=require('./routes/studentRoutes')

//Global Middleware
app.use((req,res,next)=>{
    console.log("Request URL", req.originalUrl)
    console.log("Requested Method", req.method)
    next()
})

app.use('/students',studentRoutes)

app.listen(3000,()=>{
    console.log('Server started successfully... ')
})