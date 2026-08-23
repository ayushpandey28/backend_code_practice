const http = require("http");
const server = http.createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {
        res.end("You are at Home page");
    } 
    else if (req.url === "/About" && req.method === "GET") {
        res.end("Code is about request and response");
    } 
    else if (req.url === "/Contact" && req.method === "GET") {
        res.end("You are at Contact page");
    } 
    else {
        res.statusCode = 404;
        res.end("NOT FOUND");
    }
});
server.listen(3000, () => {
    console.log("Server is Listening.....");
});