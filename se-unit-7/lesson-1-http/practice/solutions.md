# Lesson 1 Practice Exercises

0. Describe the purpose of HTTP Status Codes. Why are these important?

**Suggested Answer** HTTP Status codes provide a uniform way to describe the outcome of a web request. This means that clients can easily determine what happened when the request was made. For example, if the server encountered an error, the client may want to respond differently.

1. What is the difference between a URL and a URI?

**Suggested Answer**

A "URI" is a Uniform Resource Identifier, and refers to any means of identification for a resource. For example, a bar-code for a product in a grocery store could be considered a URI.

A "URL" is a Uniform Resource Locater, which refers to how you might find the resource as well as identify it.  In the web development world, this generally refers to something containing the protocol (i.e. `http://`), and the location (i.e. `google.com`)

2. What is the purpose of query params? How do we use them in our applications? Try to use a real-world example if you can!

**Suggested Answer**

Sometimes, we may want to collect additional, optional information from the user. For example, visiting https://twitter.com/search displays a search bar, as well as some default tweets. However, visiting https://twitter.com/search?q=dogs displays all results related to the search for "dogs".

## Code

For the following questions, write your code in `node-http-application`.

3. In `node-http-application`, use the `http` library to create a hello world application. The app should return the plain text of "Hello World" for each response, and should run on port `8000`. You can start your server using the `npm start command`

**Suggested Answer**

```js
const http = require('http')

const server = (request, response) => {
  response.write("Hello World!")
  response.end()
}

const app = http.createServer(server)

app.listen(8000)
```

4. Update your server function so that your application responds differently to different pathnames. If the path is `/`, the app should return a plain text response of "Hello World". If the path is `/dogs`, the app should return a plain text response of "Hello Dogs". For any other path, we should return a plain text message of "Sorry, that route does not exist."

**Suggested Answer**

```js
const http = require('http')

const server = (request, response) => {
  switch (request.url) {
    case '/':
      response.write('Hello World!')
      break;
    case '/dogs':
      response.write('Hello Dogs!')
      break;
    default:
      response.write('Sorry, that route does not exist')
  }
  response.end()
}

const app = http.createServer(server)

app.listen(8000)

```

5. Change the server function you wrote so that we also return the appropriate status code. The status codes of the application so that the `/` and `dogs` routes both return a 200 status, while the default option becomes a 404 response.

**Suggested Answer**

```js
const http = require('http')

const server = (request, response) => {
  switch (request.url) {
    case '/':
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write('Hello World!')
      break;
    case '/dogs':
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write('Hello Dogs!')
      break;
    default:
      response.writeHead(404, { 'Content-Type': 'text/html' });
      response.write('Sorry, that route does not exist')
  }
  response.end()
}

const app = http.createServer(server)

app.listen(8000)
```

6. Create a function called `renderText` that takes in a string of text and an optional status code integer (if no status code is given, it should default to 200). This function should write the status code to the header and the response text to the response, then end the response. Refactor your server to take advantage of this new function.

**Suggested Answer**

```js
const http = require('http')

const server = (request, response) => {

  const renderText = (text, statusCode=200) => {
    response.writeHead(statusCode, { 'Content-Type': 'text/html' });
    response.write(text)
  }

  switch (request.url) {
    case '/':
      renderText('Hello World!')
      break;
    case '/dogs':
      renderText('Hello Dogs!')
      break;
    default:
      renderText('Sorry, that route does not exist', 404)
  }
  response.end()
}

const app = http.createServer(server)

app.listen(8000)
```

7. Create a file called `index.html` in the `templates` directory. Add an HTML shell to this file, along with an `h1` tag with "Hello World" inside. Update your server to render this template at the `/` route instead of the plain text. BONUS: Create a template for the dogs route and render that template as well.

**Suggested Answer**

```js
const http = require('http')
const fs   = require('fs')

const server = (request, response) => {

  const renderText = (text, statusCode=200) => {
    response.writeHead(statusCode, { 'Content-Type': 'text/html' });
    response.write(text)
    response.end()
  }

  const renderTemplate = (filePath, statusCode=200) => {
    fs.readFile(`./templates/${filePath}`, (error, content) => {
      response.writeHead(statusCode, { 'Content-Type': 'text/html' });
      response.write(content)
      response.end()
    })
  }

  switch (request.url) {
    case '/':
      renderTemplate('index.html')
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
```

8. Make an update to your `renderTemplate` function to take in a third parameter called `params`, which should be an object. For each key-value pair in the object, we should replace any instance of `{{key}}` in the template with the value. For example, given an `index.html` template that looks like this:

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Hello World</title>
  </head>
  <body>
    <h1>Hello {{name}}</h1>
  </body>
</html>
```

Calling `renderTemplate('index.html', 200, {name: 'Doug'})` should replace `{{name}}` with Doug. **Hints**: You can use `Object.keys` to iterate over the given object, and `replace` method to swap the content of a string.

**Suggested Answer**

```js
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
```

9. Add any query params as an object for the `renderTemplate` method so we can display some non-static content to the user. For example, `/?name=Doug` should then display `Hello Doug!` in our HTML.

**Suggested Answer**

```js
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
```
