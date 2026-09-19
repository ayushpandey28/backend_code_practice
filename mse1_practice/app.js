const fs = require("fs");
const os = require("os");

// a) Read file asynchronously
fs.readFile("data.txt", "utf8", (err, data) => {
    if (err) {
        console.log("Error reading file:", err);
        return;
    }

    console.log("File Data:");
    console.log(data);
});

// b) Append data to existing file
fs.appendFile("data.txt", "\nThis data is appended.", (err) => {
    if (err) {
        console.log("Error appending file:", err);
        return;
    }

    console.log("Data appended successfully.");
});

// c) Display system information
console.log("\nSystem Information:");

console.log("Operating System:", os.platform());
console.log("Architecture:", os.arch());
console.log("Hostname:", os.hostname());
console.log("Total Memory:", os.totalmem());
console.log("Free Memory:", os.freemem());
console.log("CPU Cores:", os.cpus().length);