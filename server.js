// const fs = require("fs");
// const os = require("os");
// const path = require("path");

const http = require("http");
const fs = require("fs");
const qs = require("querystring");

 

// let body = "";

 const server = http.createServer((request, response) => {
    if (request.method === "GET") {
        // tell the browser what kind of data we are sending back to it
        response.writeHead(200, {"Content-Type": "text/html"});
        // status code of 200 important
        // send the html back to browser
        fs.createReadStream("index.html", "utf8").pipe(response);

    } else if (request.method === "POST") {
        let body = "";
        request.on("data", function (chunk) {
            body += chunk;
        })
        
        request.on("end", function() {
            const postData = qs.parse(body)
            console.log(postData)
            response.writeHead(200, {"Content-Type": "text/html"})
            response.end("<h1>Thank you for login in<h1>")
        })
    }
})

server.listen(3001, () => {
     console.log("The server is now running")
    });