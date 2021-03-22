In bold are the key takeaways from each solution.

1. I notice that my output is an empty object. As of now, there is nothing explictly being exported from the `z.js` file. **Module.exports defaults to an empty object**.

2. Now I notice that the output is an object with my three key-value pairs that I placed on the module.exports object. **The output looks this way becasue module.exports is an object like any other javascript object.**

3. `getFavoriteNumber` is defined within `lab.js` and then exported on the `modules.exports` object. The function that we exported from `lab.js` has **closure over/access to the variables and functions that it was defined with**.

4. Some people may predict that I'd see multiple `module.exports` objects. Normally when functions are invoked multiple times, the output is viewed multiple times. However, **node caches modules after the first time they are loaded**. This means (among other things) that every call to require('./someFile') will get exactly the same object returned, if it would resolve to the same file. Provided require.cache is not modified, multiple calls to require('./someFile') will not cause the module code to be executed multiple times.

5. In this example, the client is the web browser. **The server is hosted on my machine/computer**. I can view the status of my server within the terminal.
