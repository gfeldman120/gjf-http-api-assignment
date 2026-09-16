const http = require('http');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// This is where I choose which URLs do what
const urlStruct = {
  "/": responseHandler.getIndex,
  default: responseHandler.getIndex
};

const onRequest = (request, response) => {
  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);
  request.acceptedTypes = request.headers.accept ? request.headers.accept.split(',') : [];
  console.log(parsedUrl);

  const handler = urlStruct[parsedUrl.pathname];
  if (handler) {
    handler(request, response);
  }
  else {
    urlStruct.default(request, response);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});