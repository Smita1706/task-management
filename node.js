//__dirname
//__filename
//NOTE :- we are using await here because its a priomise

console.log(__dirname);
console.log(__filename);

 const fileSystem = require("fs/promises"); //file system in node js is imported using required keyword

 //create file
const fileLesson = async() => {
    await fileSystem.writeFile("test.txt","Hi"); //here we are creating text file as "test.txt" and writing the content in it using "Hi"
};
 fileLesson();

//read file
const fileRead =async()=>{
    const content =await fileSystem.readFile("test.txt","utf8");//here "utf8" is encoding formate of language
    console.log(content);
}
fileRead();

//delete file
const deleteFile = async() => { 
    await fileSystem.unlink("test.txt");
    console.log("file deleted");
} 

//deleteFile();

//update and uppend file
const apendFile = async() => { 
    await fileSystem.appendFile("text.txt"," this is new content appended");
}
apendFile();

//create folder

const createFolder = async() => {
   await fileSystem.mkdir("test");
 }

 //createFolder();
//delete folder
const deleteFolder = async() => {
await fileSystem.rmdir("test");
}
deleteFolder();


//run server using only node js

const http =require("http");

http.createServer((request,response)=>{
    response.end("hello this is server");
}).listen(5000);