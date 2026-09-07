// import express from 'express';

// const app = express();

// const port = 4000;

// // Application level middleware
// // app.use((req, res, next) => {
// //     console.log("Middleware 1");
// //     next();
// // });

// // app.use((req, res, next) => {
// //     console.log("Middleware 2");
// //     next();
// // });

// // 2) Mount on path
// // app.use('/student/:id', (req, res, next) => {
// //     console.log("Response Type:", req.method);
// //     next();
// // });

// // Multiple Route Handler
// // app.use('/user/:id',

// //     (req, res, next) => {
// //         console.log("Requested URL:", req.url);
// //         next();
// //     },

// //     (req, res, next) => {
// //         console.log("Request type:", req.method);
// //         next();
// //     }
// // );

// app.get('student/:id',(req,next)=>{
//     if(req.params.id===0)
//         next('route')
//     else
//         next()
// }
// )
// app.get("/student/:id",(req,res)=>{
//     res.send("Special Route Here")
// })
// app.listen(port, () => {
//     console.log("Server Started");
// });



import express from 'express';
const app = express();
const port = 4000;

app.get('/student/:id', (req, res, next) => {
    if (req.params.id === "0") {
        next('route');
    } else {
        next();
    }
});
app.get('/student/:id', (req, res) => {
    res.send("Special Route Here");
});
app.use((err,req,res)=>{
    console.log(err.stack)
    res.status(4000).send()
})
app.listen(port, () => {
    console.log("Server Started");
});
