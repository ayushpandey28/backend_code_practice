const http = require("http");
// const server = http.createServer((req, res) => {
//     switch (req.url) {
//         case "/":
//             res.end("My name is Ayush");
//             break;
//         case "/about":
//             res.end("This is About page");
//             break;
//         case "/contact":
//             res.end("This is Contact page");
//             break;
//         default:
//             res.statusCode = 404;
//             res.end("NOT FOUND");
//     }
// });
// server.listen(3000, () => {
//     console.log("Server is Listening.....");
// });
const PORT = 4000
const server =http.createServer((req,res)=>{
    if(req.url="/"){
        const User={
            name:"Ayush",
            branch:"CSE",
            section:"B"
    };
    res.end(JSON.stringify(user))
}
})
server.listen(PORT,()=>{
    console.log("Server Started")
})