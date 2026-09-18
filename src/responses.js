// Require files and get references to HTML/CSS
const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// Actually write the response with the correct content type, status, etc.
const respond = (request, response, content, type, status) => {
  response.writeHead(status, {
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(content, 'utf8')
  });
  response.write(content);
  response.end();
};

// Take a message, status and ID (optionally) and turn it into XML if specified by request, otherwise JSON
const convertMessageAndRespond = (request, response, message, status, id) => {
  // Make object with ID if it's included
  let object;
  if(id != undefined) {
    object = {
      message: message,
      id: id
    };
  }
  else {
    object = {
      message: message,
    };
  }
  // Differ results if XML, default to JSON
  if (request.acceptedTypes[0] === 'text/xml') {
    let responseXML = `<response><message>${object.message}</message>`;
    // Add ID if it exists
    if(id != undefined) {
      responseXML += `<id>${id}</id>`;
    }
    responseXML += `</response>`;
    return respond(request, response, responseXML, 'text/xml', status);
  }
  return respond(request, response, JSON.stringify(object), 'application/json', status);
}

// Helper methods to improve server.js readability
const getIndex = (request, response) => {
  respond(request, response, index, 'text/html', 200);
};

const getCSS = (request, response) => {
  respond(request, response, css, 'text/css', 200);
}

const successfulRequest = (request, response) => {
  convertMessageAndRespond(request, response, 'This is a successful response.', 200);
}

const badRequest = (request, response) => {
  convertMessageAndRespond(request, response, 'Missing valid query parameter set to true.', 400, 'badRequest');
}

const validBadRequest = (request, response) => {
  convertMessageAndRespond(request, response, 'This is a bad response.', 200, 'badRequest');
}

const unauthorizedRequest = (request, response) => {
  convertMessageAndRespond(request, response, 'Missing loggedIn query parameter set to yes.', 401, 'unauthorized');
}

const loggedInUnauthorizedRequest = (request, response) => {
  convertMessageAndRespond(request, response, 'This is an unauthorized response.', 200, 'unauthorized');
}

const forbiddenRequest = (request, response) => {
  convertMessageAndRespond(request, response, 'You do not have access to this content.', 403, 'forbidden');
}

const internalRequest = (request, response) => {
  convertMessageAndRespond(request, response, 'Internal server error. Something went wrong.', 500, 'internal');
}

const unimplementedRequest = (request, response) => {
  convertMessageAndRespond(request, response, 'A get request for this page has not been implemented yet. Check again later for updated content.', 501, 'unimplemented');
}

const notFoundRequest = (request, response) => {
  convertMessageAndRespond(request, response, 'The page you are looking for was not found.', 404, 'notFound');
}

// Export these functions for use elsewhere
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