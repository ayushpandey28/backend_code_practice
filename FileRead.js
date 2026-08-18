const fs=require("fs")
FilePath="./test.txt"
const result=fs.readFileSync(FilePath,"utf-8")
console.log(result)