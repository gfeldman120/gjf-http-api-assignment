const http = require('http');
const query = require('querystring');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);
  
  // Array of all accepted types
  request.acceptedTypes = request.headers.accept ? request.headers.accept.split(',') : [];

  switch (parsedUrl.pathname) {
    case '/':
      responseHandler.getIndex(request, response);
      break;
    case '/success':
      break;
    case '/badRequest':
      break;
    case '/unauthorized':
      break;
    case '/forbidden':
      break;
    case '/internal':
      break;
    case '/notImplemented':
      break;
    default:
      responseHandler.getCSS(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});