import fs from 'fs'
const readStream=fs.createReadStream('./test.txt')
const writeStream=fs.createWriteStream('./out.txt')
readStream.on('data',(chunk)=>{
    console.log(chunk)
    writeStream.write(chunk);
})
readStream.on('end',()=>{
    console.log('Reached at the end of the file')
    writeStream.end();
})

