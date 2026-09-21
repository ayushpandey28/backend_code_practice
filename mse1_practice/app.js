// const fs = require("fs");
// const os = require("os");

// // a) Read file asynchronously
// fs.readFile("data.txt", "utf8", (err, data) => {
//     if (err) {
//         console.log("Error reading file:", err);
//         return;
//     }

//     console.log("File Data:");
//     console.log(data);
// });

// // b) Append data to existing file
// fs.appendFile("data.txt", "\nThis data is appended.", (err) => {
//     if (err) {
//         console.log("Error appending file:", err);
//         return;
//     }

//     console.log("Data appended successfully.");
// });

// // c) Display system information
// console.log("\nSystem Information:");

// console.log("Operating System:", os.platform());
// console.log("Architecture:", os.arch());
// console.log("Hostname:", os.hostname());
// console.log("Total Memory:", os.totalmem());
// console.log("Free Memory:", os.freemem());
// console.log("CPU Cores:", os.cpus().length);

// const express = require("express");

// const app = express();

// app.use(express.json());

// const students = [
//     {
//         id: 1,
//         name: "Rahul",
//         age: 20
//     },
//     {
//         id: 2,
//         name: "Aman",
//         age: 21
//     }
// ];

// // Read all students
// app.get("/api/students", (req, res) => {
//     res.status(200).json(students);
// });

// // Read one student
// app.get("/api/students/:id", (req, res) => {
//     const student = students.find(
//         p => p.id === Number(req.params.id)
//     );

//     if (!student) {
//         return res.status(404).json({
//             message: "Student not found"
//         });
//     }

//     res.status(200).json(student);
// });

// // Create student
// app.post("/api/students", (req, res) => {
//     const { name, age } = req.body;

//     if (name === undefined || age === undefined) {
//         return res.status(400).json({
//             message: "name and age are required"
//         });
//     }

//     const student = {
//         id: students.length + 1,
//         name: name,
//         age: age
//     };

//     students.push(student);

//     res.status(201).json(student);
// });

// // PUT - update student
// app.put("/api/students/:id", (req, res) => {
//     const student = students.find(
//         p => p.id === Number(req.params.id)
//     );

//     if (!student) {
//         return res.status(404).json({
//             message: "student not found"
//         });
//     }

//     const { name, age } = req.body;

//     if (name === undefined || age === undefined) {
//         return res.status(400).json({
//             message: "name and age are required"
//         });
//     }

//     student.name = name;
//     student.age = age;

//     res.status(200).json(student);
// });

// // DELETE student
// app.delete("/api/students/:id", (req, res) => {
//     const index = students.findIndex(
//         p => p.id === Number(req.params.id)
//     );

//     if (index === -1) {
//         return res.status(404).json({
//             message: "Student not found"
//         });
//     }

//     students.splice(index, 1);

//     res.status(200).json({
//         message: "Student deleted successfully"
//     });
// });

// // PATCH - partial update
// app.patch("/api/students/:id", (req, res) => {
//     const student = students.find(
//         p => p.id === Number(req.params.id)
//     );

//     if (!student) {
//         return res.status(404).json({
//             message: "student not found"
//         });
//     }

//     const { name, age } = req.body;

//     if (name !== undefined) {
//         student.name = name;
//     }

//     if (age !== undefined) {
//         student.age = age;
//     }

//     res.status(200).json(student);
// });

// app.listen(8000);




const express = require("express");

const app = express();
const PORT = 8000;

app.use(express.json());


// ======================================================
// DATA
// ======================================================

let students = [
    {
        id: 1,
        name: "Rahul",
        age: 21,
        status: "present"
    },
    {
        id: 2,
        name: "Aman",
        age: 22,
        status: "absent"
    }
];

let nextId = 3;


// ======================================================
// REUSABLE FUNCTIONS
// ======================================================

// Find object by ID
function findById(array, id) {
    return array.find(x => x.id === Number(id));
}


// Positive number validation
function validNumber(value) {
    return typeof value === "number" &&
           Number.isFinite(value) &&
           value > 0;
}


// Common error response
function error(res, code, message) {
    return res.status(code).json({
        message: message
    });
}


// Student validation
function validStudent(name, age, status) {

    if (
        !name ||
        !validNumber(age) ||
        !["present", "absent"].includes(status)
    ) {
        return false;
    }

    return true;
}


// ======================================================
// GET ALL
// ======================================================

app.get("/api/students", (req, res) => {

    res.json({
        message: "Students retrieved successfully",
        data: students
    });

});


// ======================================================
// GET BY ID
// ======================================================

app.get("/api/students/:id", (req, res) => {

    const student = findById(
        students,
        req.params.id
    );

    if (!student)
        return error(res, 404, "Student not found");

    res.json({
        message: "Student retrieved successfully",
        data: student
    });

});


// ======================================================
// GET USING QUERY
// ======================================================

app.get("/api/search", (req, res) => {

    const { name, status } = req.query;

    let result = students;

    if (name) {
        result = result.filter(
            student =>
                student.name.toLowerCase() ===
                name.toLowerCase()
        );
    }

    if (status) {
        result = result.filter(
            student => student.status === status
        );
    }

    res.json({
        message: "Search successful",
        data: result
    });

});


// ======================================================
// POST
// ======================================================

app.post("/api/students", (req, res) => {

    const { name, age, status } = req.body;

    if (!validStudent(name, age, status)) {
        return error(
            res,
            400,
            "Please provide valid student details"
        );
    }

    const student = {
        id: nextId++,
        name,
        age,
        status
    };

    students.push(student);

    res.status(201).json({
        message: "Student created successfully",
        data: student
    });

});


// ======================================================
// PUT
// Complete replacement
// ======================================================

app.put("/api/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = students.findIndex(
        student => student.id === id
    );

    if (index === -1)
        return error(res, 404, "Student not found");

    const { name, age, status } = req.body;

    if (!validStudent(name, age, status)) {
        return error(
            res,
            400,
            "All fields are required"
        );
    }

    students[index] = {
        id,
        name,
        age,
        status
    };

    res.json({
        message: "Student replaced successfully",
        data: students[index]
    });

});


// ======================================================
// PATCH
// Partial update
// ======================================================

app.patch("/api/students/:id", (req, res) => {

    const student = findById(
        students,
        req.params.id
    );

    if (!student)
        return error(res, 404, "Student not found");

    const { name, age, status } = req.body;

    if (name !== undefined) {

        if (typeof name !== "string" ||
            name.trim() === "") {

            return error(res, 400, "Invalid name");
        }

        student.name = name;
    }


    if (age !== undefined) {

        if (!validNumber(age))
            return error(res, 400, "Invalid age");

        student.age = age;
    }


    if (status !== undefined) {

        if (!["present", "absent"].includes(status))
            return error(res, 400, "Invalid status");

        student.status = status;
    }


    res.json({
        message: "Student updated successfully",
        data: student
    });

});


// ======================================================
// DELETE
// ======================================================

app.delete("/api/students/:id", (req, res) => {

    const index = students.findIndex(
        student =>
            student.id === Number(req.params.id)
    );

    if (index === -1)
        return error(res, 404, "Student not found");

    students.splice(index, 1);

    res.json({
        message: "Student deleted successfully"
    });

});


// ======================================================
// FILTER
// ======================================================

app.get("/api/students/status/:status", (req, res) => {

    const result = students.filter(
        student =>
            student.status === req.params.status
    );

    res.json(result);

});


// ======================================================
// MAP
// ======================================================

app.get("/api/student-names", (req, res) => {

    const result = students.map(student => ({
        id: student.id,
        name: student.name
    }));

    res.json(result);

});


// ======================================================
// REDUCE
// ======================================================

app.get("/api/summary", (req, res) => {

    const totalAge = students.reduce(
        (sum, student) =>
            sum + student.age,
        0
    );

    res.json({
        totalAge,
        count: students.length
    });

});


// ======================================================
// CALCULATIONS
// Simple + Compound in ONE endpoint
// ======================================================

app.post("/api/calculate", (req, res) => {

    const {
        type,
        principal,
        rate,
        time
    } = req.body;


    if (
        !validNumber(principal) ||
        !validNumber(rate) ||
        !validNumber(time)
    ) {
        return error(
            res,
            400,
            "Please provide valid input"
        );
    }


    // Simple Interest
    if (type === "simple") {

        const interest =
            principal * rate * time / 100;

        return res.json({
            interest
        });
    }


    // Compound Interest
    if (type === "compound") {

        const amount =
            principal *
            Math.pow(
                1 + rate / 100,
                time
            );

        const interest =
            amount - principal;

        return res.json({
            interest
        });
    }


    return error(
        res,
        400,
        "Invalid calculation type"
    );

});


// ======================================================
// VOTING
// ======================================================

let candidates = [
    {
        id: 1,
        name: "Candidate A",
        votes: 0
    },
    {
        id: 2,
        name: "Candidate B",
        votes: 0
    }
];


app.post("/api/vote", (req, res) => {

    const candidate = findById(
        candidates,
        req.body.candidateId
    );

    if (!candidate)
        return error(
            res,
            404,
            "Candidate not found"
        );

    candidate.votes++;

    res.json({
        message: "Vote cast successfully"
    });

});


// ======================================================
// RATING
// ======================================================

let product = {
    id: 1,
    name: "Laptop",
    totalRating: 0,
    ratingCount: 0
};


app.post("/api/rate", (req, res) => {

    const { rating } = req.body;

    if (
        typeof rating !== "number" ||
        rating < 1 ||
        rating > 5
    ) {
        return error(
            res,
            400,
            "Invalid rating"
        );
    }

    product.totalRating += rating;
    product.ratingCount++;

    const average =
        product.totalRating /
        product.ratingCount;

    res.json({
        averageRating: average
    });

});


// ======================================================
// NESTED DATA
// ======================================================

let questions = [
    {
        id: 1,
        question: "Favorite language?",
        options: [
            { id: 1, text: "JavaScript" },
            { id: 2, text: "Python" }
        ]
    }
];


app.post("/api/answer", (req, res) => {

    const {
        questionId,
        optionId
    } = req.body;


    const question = findById(
        questions,
        questionId
    );

    if (!question)
        return error(
            res,
            404,
            "Question not found"
        );


    const option = question.options.find(
        option =>
            option.id === Number(optionId)
    );


    if (!option)
        return error(
            res,
            400,
            "Invalid option"
        );


    res.json({
        answer: option
    });

});


// ======================================================
// LIBRARY STATE CHANGE
// ======================================================

let book = {
    id: 1,
    title: "Clean Code",
    available: true
};


app.post("/api/books/issue", (req, res) => {

    if (!book.available)
        return error(
            res,
            400,
            "Book is already issued"
        );

    book.available = false;

    res.json({
        message: "Book issued successfully"
    });

});


app.post("/api/books/return", (req, res) => {

    book.available = true;

    res.json({
        message: "Book returned successfully"
    });

});


// ======================================================
// SERVER
// ======================================================

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});