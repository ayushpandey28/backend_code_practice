const fs = require("fs");
const http = require("http");
const server = http.createServer((req, res) => {
    res.end("print the ans");
});
server.listen(5000, () => {
    console.log("Server running");
});