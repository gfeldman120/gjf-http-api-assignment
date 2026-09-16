const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const respond = (request, response, content, type) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getXMLTest = (request, response) => {
  const item = {
    name: 'Something'
  };

  if (request.acceptedTypes[0] === 'application/xml') {
    let responseXML = '<response>';
    responseXML += `<name>${item.name}</name>`;
    responseXML += '</response>';
    return respond(request, response, responseXML, 'application/xml');
  }

  return respond(request, response, JSON.stringify(item), 'application/json');
};

const getIndex = (request, response) => {
  respond(request, response, index, 'text/html');
};

module.exports = {
  getXMLTest,
  getIndex,
};