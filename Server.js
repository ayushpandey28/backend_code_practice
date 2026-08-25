// const http = require("http");
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


// const PORT = 4000
// const server =http.createServer((req,res)=>{
//     if(req.url="/"){
//         const User={
//             name:"Ayush",
//             branch:"CSE",
//             section:"B"
//     };
//     res.end(JSON.stringify(user))
// }
// })
// server.listen(PORT,()=>{
//     console.log("Server Started")
// })


//import http built in module
const http = require('http')
const server=http.createServer((req,res)=>{
if(req.url==='/user' && req.method==="GET"){
let body=''
req.on('data',(chunk)=>{
    body+=chunk
})
req.on('end',()=>{
    console.log("Raw Data",body)
    const user=JSON.parse(body)
    console.log("Parsed Data",user)
})
res.end(JSON.stringify({
    message:"User Created Successfully",
    user:user
}))

}
getEventListeners.end("Not Found")
})
server.listen(3000,()=>{
    console.log("Server sun raha hai")
})
