const fs=require("fs");
const zlib=require("zlib");
//create readStream
const readStream=fs.createReadStream('./test2.txt');
// transform
const gzip=zlib.createGzip();

// create and write on stream;
const writeStream=fs.createWriteStream('./test.txt');

//Do create and use pipe;
readStream.pipe(gzip).pipe(writeStream)