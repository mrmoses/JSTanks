var http = require('http');
var path = require('path');
var fs = require('fs');

http.createServer(function(req,res) {
    var filePath = '.' + req.url;
    if(filePath == './')
        filePath = './tanks.html';
        
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }
    path.exists(filePath, function(exists) {
        if(exists) {
            fs.readFile(filePath, function(error,content) {
                if(error) {
                    res.writeHead(500);
                    res.end();
                } else {
                    res.writeHead(200, {'Content-Type':contentType});
                    res.end(content,'utf-8');
                }
            });
        }
        else {
            res.writeHead(404);
            res.end();
        }
    });
}).listen(process.env.C9_PORT);

console.log("http://0.0.0.0:"+process.env.C9_PORT);