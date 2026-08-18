const fs=require('fs')
const FilePath="./test.txt"
const content="Thanks for Calling me"
fs.writeFileSync("./test.txt","Hello Student.")
console.log("Bye")
fs.writeFile("./test2.txt","Demo of sync write of file",(err)=>{
    if(err) throw err
    console.log("I am Ayush")
})
console.log("I am out of file")