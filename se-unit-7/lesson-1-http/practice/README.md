# Lesson 1 Practice Exercises

0. Describe the purpose of HTTP Status Codes. Why are these important?

1. What is the difference between a URL and a URI?

2. What is the purpose of query params? How do we use them in our applications?

## Code

For the following questions, write your code in `node-http-application`.

3. In `node-http-application`, use the `http` library to create a hello world application. The app should return the plain text of "Hello World" for each response, and should run on port `8000`. You can start your server using the command `npm start`.

4. Update your server function so that your application responds differently to different pathnames. If the path is `/`, the app should return a plain text response of "Hello World". If the path is `/dogs`, the app should return a plain text response of "Hello Dogs". For any other path, we should return a plain text message of "Sorry, that route does not exist."

5. Change the server function you wrote so that we also return the appropriate status code. The status codes of the application so that the `/` and `dogs` routes both return a 200 status, while the default option becomes a 404 response.

6. Create a function called `renderText` that takes in a string of text and an optional status code integer (if no status code is given, it should default to 200). This function should write the status code to the header and the response text to the response, then end the response. Refactor your server to take advantage of this new function.

7. Create a file called `index.html` in the `templates` directory. Add an HTML shell to this file, along with an `h1` tag with "Hello World" inside. Update your server to render this template at the `/` route instead of the plain text. BONUS: Create a template for the dogs route and render that template as well.

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


9. Add any query params as an object for the `renderTemplate` method so we can display some non-static content to the user. For example, `/?name=Doug` should then display `Hello Doug!` in our HTML.
