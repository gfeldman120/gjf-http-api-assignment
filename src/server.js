// Require files and setup port
const http = require('http');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Get the request from the client and figure out what it is
const onRequest = (request, response) => {
  // Setup parsed URL for switch statement
  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);
  
  // Set array of all accepted types
  request.acceptedTypes = request.headers.accept ? request.headers.accept.split(',') : [];

  // Change which function to call based on pathname and parameters
  switch (parsedUrl.pathname) {
    case '/':
      responseHandler.getIndex(request, response);
      break;
    case '/style.css':
      responseHandler.getCSS(request, response);
      break;
    case '/success':
      responseHandler.successfulRequest(request, response);
      break;
    case '/badRequest':
      // Make a different request if the parameter exists and is 'true'
      if(parsedUrl.searchParams.get('valid') === 'true') {
          responseHandler.validBadRequest(request, response);
          break;
      }
      responseHandler.badRequest(request, response);
      break;
    case '/unauthorized':
      // Make a different request if the parameter exists and is 'yes'
      if(parsedUrl.searchParams.get('loggedIn') === 'yes') {
          responseHandler.loggedInUnauthorizedRequest(request, response);
          break;
      }
      responseHandler.unauthorizedRequest(request, response);
      break;
    case '/forbidden':
      responseHandler.forbiddenRequest(request, response);
      break;
    case '/internal':
      responseHandler.internalRequest(request, response);
      break;
    case '/notImplemented':
      responseHandler.unimplementedRequest(request, response);
      break;
    default:
      responseHandler.notFoundRequest(request, response);
      break;
  }
};

// Make the server
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});