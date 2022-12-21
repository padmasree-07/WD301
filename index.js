const http = require("http");
const fs = require("fs");

const arg = require("minimist")(process.argv.slice(2));
console.log(arg);
const port = arg._[0];
console.log(port);


let homeContent = "";
let projectContent ="";
let registrationContent ="";


fs.readFile("home.html" , (err,home) =>{
    if(err){
        throw err;

    }
    homeContent = home;
});

fs.readFile("projects.html" , (err, data) =>{
    if(err){
        throw err;

    }
    projectContent = data;
});

fs.readFile("registration.html" , (err,data) =>{
    if(err){
        throw err;

    }
    registrationContent = data;
});

http
 .createServer((req,res) => {
    let url = req.url;
    res.writeHeader(200,{ "Content-Type":"text/html"});
    switch(url){
        case "/projects":
            res.write(projectContent);
            res.end();
            break;
        case "/registration":
            res.write(registrationContent);
            res.end();
            break;
        default:
            res.write(homeContent);
            res.end();
            break;
    }
 })
 .listen(port ,() =>{
    console.log(`Server is listening at ${port}`);
 });