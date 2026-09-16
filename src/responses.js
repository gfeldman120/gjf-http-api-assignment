const fs = require('fs'); // pull in the file system module

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

const getXMLTest = (request, response) => {
  const item = {
    name: 'Something'
  };

  if (request.acceptedTypes[0] === 'application/xml') {
    let responseXML = '<response>';
    responseXML += `<name>${item.name}</name>`;
    responseXML += '</response>';
    return respond(request, response, responseXML, 'application/xml', 200);
  }

  return respond(request, response, JSON.stringify(item), 'application/json', 200);
};

const getIndex = (request, response) => {
  respond(request, response, index, 'text/html', 200);
};

const getCSS = (request, response) => {
  respond(request, response, css, 'text/css', 200);
}

module.exports = {
  respond,
  getXMLTest,
  getIndex,
};