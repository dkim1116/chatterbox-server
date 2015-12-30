var empty = {
  results: [{
    text:'halo',
    username: 'Juan',
    objectId: 1
  }]
};
var fs = require("fs");

exports.requestHandler = function(request, response) {
  var statusCode = 200;
  var headers = defaultCorsHeaders;
  var content;
  headers['Content-Type'] = "application/json";

  if(request.url === '/arglebargle'){
    response.writeHead(404, headers)
    response.end()
  } else {
    if(request.method === 'GET'){
      console.log("Serving request type " + request.method + " for url " + request.url);
      response.writeHead(statusCode, headers);
      // content = '../client/index.html';
      // fs.readFile(content, function(error, contents){
      //   if(error){
      //     console.log(error);
      //   } else {
      //     response.end(contents)
      //   }
      // });
      response.end(JSON.stringify(empty))
    } else if(request.method === 'POST'){
      request.on('data', function(chunk){
        empty.results.push(JSON.parse(chunk))
        console.log(empty.results)
        });
      request.on('end', function(){
        response.writeHead(201, headers)
        console.log(empty)
        response.end(JSON.stringify(empty))
      });
    } else if (request.method === 'OPTIONS'){
      response.writeHead(statusCode, headers)
      response.end(JSON.stringify(empty))
    }
  }
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

