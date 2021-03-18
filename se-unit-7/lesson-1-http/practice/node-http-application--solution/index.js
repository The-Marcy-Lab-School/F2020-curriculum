const http = require('http')
const fs   = require('fs')
const url = require('url');


const server = (request, response) => {

  const renderText = (text, statusCode=200) => {
    response.writeHead(statusCode, { 'Content-Type': 'text/html' });
    response.write(text)
    response.end()
  }

  const renderTemplate = (filePath, statusCode=200, params={}) => {
    fs.readFile(`./templates/${filePath}`, 'utf8', (error, content) => {
      response.writeHead(statusCode, { 'Content-Type': 'text/html' });
      Object.keys(params).forEach(key => {
        content = content.replace(`{{${key}}}`, params[key])
      })
      response.write(content)
      response.end()
    })
  }

  const urlInfo = url.parse(request.url, true);


  switch (urlInfo.pathname) {
    case '/':
      renderTemplate('index.html', 200, urlInfo.query)
      break;
    case '/dogs':
      renderTemplate('dogs.html')
      break;
    default:
      renderText('Sorry, that route does not exist', 404)
  }
}

const app = http.createServer(server)

app.listen(8000)
