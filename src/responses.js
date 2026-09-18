const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const respond = (request, response, content, type, status) => {
  response.writeHead(status, {
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(content, 'utf8')
  });
  response.write(content);
  response.end();
};

const convertMessageAndRespond = (request, response, message, status) => {
  // Make object
  const object = {
    message: message
  };
  // Differ results if XML, default to JSON
  if (request.acceptedTypes[0] === 'text/xml') {
    let responseXML = `<response><name>${object.message}</name></response>`;
    return respond(request, response, responseXML, 'text/xml', status);
  }
  return respond(request, response, JSON.stringify(object), 'application/json', status);
}

// Helper methods to improve readability
const getIndex = (request, response) => {
  respond(request, response, index, 'text/html', 200);
};

const getCSS = (request, response) => {
  respond(request, response, css, 'text/css', 200);
}

const successfulRequest = (request, response) => {
  convertMessageAndRespond(request, response, 'This is a successful request', 200);
}

const badRequest = (request, response) => {
  convertMessageAndRespond(request, response, 'This is a bad request', 400);
}

const validBadRequest = (request, response) => {
  convertMessageAndRespond(request, response, 'This is a valid bad request', 200);
}

const unauthorizedRequest = (request, response) => {
  convertMessageAndRespond(request, response, 'This is an unauthorized request', 401);
}

const loggedInUnauthorizedRequest = (request, response) => {
  convertMessageAndRespond(request, response, 'This is a logged in unauthorized request', 200);
}

const forbiddenRequest = (request, response) => {
  convertMessageAndRespond(request, response, 'This is a forbidden request', 403);
}

const internalRequest = (request, response) => {
  convertMessageAndRespond(request, response, 'This is an internal request', 500);
}

const unimplementedRequest = (request, response) => {
  convertMessageAndRespond(request, response, 'This is an unimplemented request', 501);
}

const notFoundRequest = (request, response) => {
  convertMessageAndRespond(request, response, 'This is a not found request', 404);
}

module.exports = {
  getIndex,
  getCSS,
  successfulRequest,
  badRequest,
  validBadRequest,
  unauthorizedRequest,
  loggedInUnauthorizedRequest,
  forbiddenRequest,
  internalRequest,
  unimplementedRequest,
  notFoundRequest,
};