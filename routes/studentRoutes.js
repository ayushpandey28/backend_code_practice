import express from 'express'
const router = express.Router()
let students = [
    {
        id: 1,
        name: "Ayush",
        age: 20,
        course: "CSE"
    },
    {
        id: 2,
        name: "Pandey",
        age: 21,
        course: "IT"
    }
]
// GET - All students
router.get('/', (req, res) => {
    res.json(students)
})


// GET - Search student
router.get('/search', (req, res) => {

    const course = req.query.course
    const age = parseInt(req.query.age)

    if (!course || isNaN(age)) {
        return res.status(400).json({
            message: "Course and age are required"
        })
    }

    const stud = students.filter(
        s =>
            s.course.toLowerCase() === course.toLowerCase() &&
            s.age === age
    )

    res.json(stud)
})


// GET - Student by ID
router.get('/:id', (req, res) => {

    const id = parseInt(req.params.id)

    const student = students.find(
        student => student.id === id
    )

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        })
    }

    res.json(student)
})


// POST - Create student
router.post('/', (req, res) => {

    const { name, age, course } = req.body

    if (!name || !age || !course) {
        return res.status(400).json({
            message: "Name, age and course are required"
        })
    }

    const newStudent = {
        id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
        name,
        age,
        course
    }

    students.push(newStudent)

    res.status(201).json({
        message: "Student created successfully",
        student: newStudent
    })
})


// PUT - Update student
router.put('/:id', (req, res) => {

    const id = parseInt(req.params.id)

    const student = students.find(
        student => student.id === id
    )

    if (!student) {
        return res.status(404).json({
            message: "No record found"
        })
    }

    const { name, age, course } = req.body

    student.name = name
    student.age = age
    student.course = course

    res.json({
        message: "Student updated successfully",
        student
    })
})


// DELETE - Delete student
router.delete('/:id', (req, res) => {

    const id = parseInt(req.params.id)

    const student = students.find(
        student => student.id === id
    )

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        })
    }

    students = students.filter(
        student => student.id !== id
    )

    res.json({
        message: "Student deleted successfully",
        student
    })
})


export default router