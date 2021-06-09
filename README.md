# Overview

The Build Tool unit presents the challenge to create the tools and environment needed to work on a modern frontend project, especially a React project. Tooling is highly customizable and determined by the team, the project, and the technologies used. Gaining familiarity with how they work and how to use them empowers you to control all aspects of your projects and to be ready to adopt the tools of any team you join.

You will build tools using the [Webpack](https://webpack.js.org/) module bundler with [Babel](https://babeljs.io/) transpilation to bundle and transpile an existing React app. We will first be utilizing Webpack to create a production build that could be served on a real website. Then, you will utilize [Webpack-dev-server](https://webpack.js.org/configuration/dev-server/) for fast development with live-reloading. Finally, you will utilize [Gulp](https://gulpjs.com/) with [Browserify](http://browserify.org/), an older but still relevant technology for module-bundling (Browserify) and task-running (Gulp).

### Learning Goals

- [ ] Learn how to use Webpack in production mode for a React project
- [ ] Learn how to use Webpack-dev-server in development mode for fast development and live-reloading
- [ ] Utilize the proxy setting in Webpack-dev-server for utilizing an Express API server (back end) in combination with a React project (front end) for a streamlined codebase in both production and development mode
- [ ] Learn how to use Gulp with Browserify to start a project in React as an alternative tool

## Getting Started

- Install dependencies: `npm install`. We will install more dependencies for Webpack and Babel along the way.

- Once you've setup your Webpack config file (`webpack.config.js`) in the challenges below, you can create your Webpack production build by running: `npm run build`. You can then run the application server with `npm start` and view the React application on `localhost:3000`

- Once you've setup your Gulpfile in the challenges below, start the gulp build by running: `npm run gulp`

## Build Tools challenge: Webpack

After running `npm start` the server starts on port 3000, but the React app doesn't render anything. There are no tests for this unit; use whether or not your app is rendering to check if your build is working correctly.

[Webpack](https://webpack.js.org/) is a module bundler. It is the industry standard for creating a complex front-end JS project with multiple files (modules). Usually those JS files (modules) come in two types

1. ES6 modules, which are often the front end files we write. These utilize `import` and `export` statements. In a typical React project, a file might be for e.g. a React component or a Redux reducer or action creator file.
2. CommonJS modules, which are often the npm node modules we bring in to a front end codebase. These utilize `require` and `module.exports`. With Webpack, anything written for Node.js (i.e. modules from npm) can also be placed into front end code served to the browser.

Webpack can gracefully combine and optimize projects with both type of JS modules and serve it in a single `bundle.js` file. This is how we avoid the script tag "hell" mentioned in the lecture. Webpack also has the ability to include within the `bundle.js` file other assets like CSS styles and images, allowing for a modular code experience.

Webpack also achieves the goal of _transpilation_, which is the processing of custom file types that go beyond traditional JS or CSS. This is done using _loaders_. In particular, the loaders that particularly deal with transpiling JS code are known as Babel loaders. We will create a `webpack.config.js` file that will

- bundle your JS and CSS files together into a `bundle.js` file.
- transpile React [JSX](https://reactjs.org/docs/introducing-jsx.html) syntax (the ability to write HTML-looking code within React code) into JS code [understandable](https://reactjs.org/docs/react-without-jsx.html) by the browser.
- transpile ES6/7/8 code into ES5 code readable by all internet users, including Internet Explorer users. About 10% of Desktop internet traffic still comes from Internet Explorer.
- transpile your [SCSS](https://sass-lang.com/) files into browser-readable CSS.

Run `npm start` now and go to `localhost:3000`. This server comes from the `server/server.js` file, which serves both `index.html` and all static assets in the `/build` folder. Notice that the request to `/build/bundle.js` is 404ing, because we have no `bundle.js`. This is the JavaScript code that represents all of our JS (React code) and inlined-CSS bundled together in one JS file. We will first learn how to create a production `bundle.js` file using Webpack. We will then test it on our `localhost:3000` server. The [docs](https://webpack.js.org/concepts/) are useful for the following steps.

- [ ] Create a file called `webpack.config.js` in the project root directory. Here, we set `module.exports` to be an object that will hold all the configuration necessary for Webpack to properly process file assets into a bundle.

- [ ] Set the `client/index.js` file as the entry. This is the initial file that Webpack parses through to make a dependency graph of all file assets to be bundled together, including your entire frontend React code, imported node modules, imported CSS and image files, etc.

- [ ] Set the bundle to be output as filename `bundle.js` in the `build` folder. The Webpack build process, after it runs, will make a file in the `build` folder called `bundle.js`.

- [ ] Set the mode to be `production`. This means that we are creating a minified and uglified production bundle, which compresses the codebase so that a client visiting our website can get the code delivered faster.

- [ ] Now try running `npm run build`. This should error out - read the error message! According to the error message, Webpack errors out upon encountering the code `<App />` in `render(<App />, document.getElementById('root'))` in our React code. The code `<App />` is JSX, which is the ability to write HTML-looking code within React code. The browser's JS engine cannot natively read JSX: it has to be parsed into JS code [understandable](https://reactjs.org/docs/react-without-jsx.html) by the browser. We need to have a transpiler (Babel) convert JSX into `React.createElement` calls. Indeed, the JSX you have been writing for React code has been interpreted by Babel as `React.createElement` calls.

- [ ] The docs describe Babel loaders [here](https://webpack.js.org/loaders/babel-loader/). `npm install -D` the following modules as dev-dependencies: `babel-loader`, `@babel/core`, `@babel/preset-env`, and `@babel/preset-react`. This Stack Overflow [answer](https://stackoverflow.com/questions/47721169/babel-vs-babel-core-vs-babel-loader-vs-babel-preset-2015-vs-babel-preset-react-v) has a wonderful description (go read it!) of how each of these modules fits into the larger process of Babel transpilation.

- [ ] Now we can define our rules array that will allow us to transpile our front-end js code. Our first rule will test for `/\.jsx?/` (either `.js` or `.jsx` file extensions) and will allow us to transpile React code. Include the presets `@babel/preset-env` and `@babel/preset-react`. _Make sure_ that Babel isn't being run on `node_modules`, because `node_modules` are fine as they are and don't require a transpilation process. Spin up the app and we have a tic-tac-toe game!

- [ ] Currently our page has no styling. Webpack offers the ability to `import` styles within a JS file for greater modularity of CSS, and it accomplishes this by inlining the styles within `bundle.js`. Go to `index.js` in the client folder and uncomment out the line for importing styles. Run the Webpack build again. This will give an error in the `application.scss` file (read the error message!). We need another rule in our rules array to import CSS and in particular transpile SCSS files, which is a superset language for CSS that has extra features like variable names, nesting, etc. Do some research for how to accomplish this loading and transpiling in our Webpack config.

- [ ] Your tic-tac-toe game should now have styling! Open up the dev tools and click on the Sources tab, and take a look at the `/build/bundle.js` file. Notice that because we are in `production` mode and optimizing for small bundle size, the code is minified (unnecessary whitespace removed) and uglified (variables are terse and unreadable one-character names).

### Build Tools challenge: Webpack Dev Server

The process outlined above for creating a production build is good for serving to a website, but it is inconvenient to (a.) re-run Webpack in the command line to (b.) minify/uglify the production build every time we make a small change. Change the mode in your `webpack.config.js` to development. This forgoes the minify/uglify process and makes bundling faster (check either the dev tools Sources tab or the file in the build folder and look at the code: please do!) but we still have to re-run Webpack and restart the `localhost:3000` server every time. We would rather have the changes in our codebase show up as quickly as possible.

Install [Webpack-dev-server](https://github.com/webpack/webpack-dev-server) and save in devDependencies. Running `webpack-dev-server` creates a simple development server on `localhost:8080` with built in live reloading. Our dev server delivers both `index.html` and Webpack bundle content. Efficient rebuilding is achieved because Webpack bundle content is stored in _memory_ rather than the _file system_. Webpack-dev-server _watches_ the files in our React codebase for changes. Webpack-dev-server maintains a _websocket_ connection to the browser so that notification of changes in our React codebase gets immediately sent to the client on our browser through a websocket message. No need to run the `localhost:3000` express server at all (at least for the time being) because everything is provided by the dev server.

- [ ] Change the mode in your `webpack.config.js` to development (if you haven't already). Also delete the `bundle.js` file in the build folder (so that, for debugging purposes, you know for sure that any content you serve is from `webpack-dev-server`).
- [ ] Run `npm run dev` (don't run `npm start`). The web page automatically opens because we're running `webpack serve --open`. We should get a 404 error for the route `/build/bundle.js`.
- [ ] How can we get rid of this error? Hint: look up the `devServer` [setting](https://webpack.js.org/configuration/dev-server/) for `webpack.config.js` and see if we can modify the `publicPath` on which Webpack output is served.
- [ ] We should now have a working app served by webpack-dev-server! Notice that the `build` folder in our filesystem is completely empty: this is because webpack-dev-server keeps the bundle in memory rather than on disk.
- [ ] While the app is running on `localhost:8080`, go to `GameList.js`, change `<h3>Previous matches</h3>` to `<h3>Past matches</h3>`, and save the file. The browser refreshes and the change shows up immediately! This is known as live-reloading, and demonstrates the power of webpack-dev-server. Also go to `_game.scss` and change the style of the body background from light blue to (e.g.) red, and notice how the browser immediately refreshes upon save, showing the background color change.

Notice how the `bundle.js` code in the Sources tab (check it!) is human-readable and not minified and uglified. This is because we are in development mode in our `webpack.config.js`. We would like to be able to easily switch between development mode and production mode in our webpack config file so that we don't have to change the code for `webpack.config.js` every time we switch between development and production. We can do this with an _environment variable_. In Node.js, the object `process.env` stores all our environment variables. Typically the environment variable we use to designate production vs development is `NODE_ENV`. In the package.json scripts for `dev` and `build`, set the `NODE_ENV` to be `development` and `production`, respectively. Then set `mode` in your webpack config to be the environment variable. This allows our webpack config to easily be used for either development or production. Test both the development and production setups to see if this works.

### Build Tools challenge: Proxy in Webpack Dev Server

What if our React application makes a call to an backend express API server to fetch JSON data? In production, we have no problems, but for a smooth development experience with webpack-dev-server, we experience some challenges that we will need to solve with the `proxy` setting for webpack-dev-server. Let's demonstrate this. Go to the backend `server.js` and uncomment out the `app.get('/api/leaders'...` code. This route serves some simple fixed JSON data for the leaderboard of our tic-tac-toe game. Then go to `Leaders.js` and uncomment out the `fetch('/api/leaders')...` code. Generate the production build and run the `localhost:3000` server, which now serves the `index.html`, `bundle.js`, and JSON data API. The fetch request on the frontend works and results in the leaderboard showing on the screen.

Now run webpack-dev-server. Notice that the frontend fetch request returns a 404. Why is this?

The domain we are in is `localhost:8080` i.e. the dev server. The server API that responds to `/api/leaders` is our express server on `localhost:3000`. We therefore need to do two things:

1. In our npm script for `dev`, we need to run webpack-dev-server at the same time the express server runs (the express server is run preferably using nodemon rather than node). We can do this in just one npm script for `dev` - no need to run `npm start`. Simply write one npm script for `dev` that runs both webpack-dev-server and the express server at the same time. Windows users may have to do this using the [concurrently](https://www.npmjs.com/package/concurrently) module.
2. We need to set the `proxy` setting within `devServer` in `webpack.config.js`. Search the [documentation](https://webpack.js.org/configuration/dev-server/). The proxy setting allows the request for `/api/leaders`, which would normally be for the domain `localhost:8080`, to be instead made for the domain `localhost:3000`. Thus, instead of the request for `/api/leaders` being made to `localhost:8080/api/leaders`, the request for `/api/leaders` is made to `localhost:3000/api/leaders`.

We thus now have the ability to make a call to our express API server in development mode! The server structure is as follows. In production, there is only one express server. This server serves the `index.html`, `bundle.js`, and JSON data API. In development, there are two servers: the webpack-dev-server and the express server. The webpack-dev-server is responsible for the frontend html page and React bundle. The express server is merely responsible for the JSON data API. This model of one server for production and two servers for development is common in React projects, and projects that need to be bundled with Webpack in general.

One final piece of best practice is recommended. In the code for `server.js`, the lines of code that serve the `build` folder and the `index.html` file are not needed in development mode, since the `localhost:3000` express server doesn't need to serve them (instead, the webpack-dev-server serves them). Wrap these lines of code in an `if` statement that checks whether the `NODE_ENV` variable is in production, so that they are only served in production mode because they are only needed then. Make sure that your project still works in both production and development mode, and that the `localhost:3000` server in development mode doesn't serve `index.html` on `/` and `/build/bundle.js` (try testing with Postman).

Other extensions:

- [ ] Implement the [Mini-CSS-Extract-Plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) in production so that styles are not inlined in bundle.js, but rather placed in a separate styles.css file that can be loaded in parallel to the JS bundle. This improves the performance of the initial page load in production if we have a large amount of CSS. A great deal of effort in frontend web performance is dedicated towards making the initial page load fast, so that users are less likely to initially leave the web page.
- [ ] Implement Hot Module Replacement. [HMR](https://webpack.js.org/concepts/hot-module-replacement/) is the ability to make changes in to modules in webpack-dev-server without needing a full refresh of the browser. This improves our experience in development.
- [ ] Use Webpack to minify images: jpg are usually compressed before being deployed. Download some high-res images [like this bird](https://commons.wikimedia.org/wiki/Category:Colorful_birds#/media/File:Schwarzk%C3%B6pfchen.JPG) and add to the `index.html`. Use a tool to minify/compress the jpg so that load time is quicker on the `index.html`.

## Extension: Build tools challenge: Gulp with Browserify

The main goal of this module is to learn Webpack. The Gulp material here can be considered as an extension.

Utilizing the task-runner [Gulp](https://gulpjs.com/) to run the module-bundler [Browserify](http://browserify.org/) is an older but still relevant option. You might still see Gulp with Browserify at your future workplace, so learning how to setup a `Gulpfile.js` that runs Browserify (which does the actual module bundling) is an important skill.

Comment/uncomment the correct script tags in `index.html` to begin this challenge so that the bundle file comes from Browserify and not Webpack. We will use Gulp with Browserify to create a production build.

Make a Gulp task called `prod`. This task will get run by Gulp in our npm script for `npm run gulp-prod`, which runs the Gulp task named `prod`.

The steps necessary within the Gulp task called `prod` are as follows (research documentation and/or Stack Overflow for precise syntax). You will be responsible for installing the necessary node_modules along the way (there are quite a few of them).

1. Run `browserify` on the `sourceFile` (the `sourceFile` is essentially our Webpack entry point).
2. Run a transform with `babelify`, using the same presets as with Webpack (i.e. `@babel/preset-env` and `@babel/preset-react`) in order for the browser to read our React JS files.
3. Run a transform with `sassify` in order to bundle our SCSS files, and to convert the SCSS into regular CSS.
4. Perform the bundle.
5. Pipe into a `vinyl-source-stream` with the `destFile` name as an argument.
6. Pipe the stream into the `destFolder`.

Try running `npm run gulp-prod` to produce the browserify bundle, then run `npm start` to see if it worked.

Notice that our code is not minified/uglified. Check this by looking at `browserify-bundle.js` within the `build` folder or by using the dev tools in the browser. Utilize `vinyl-buffer` and `gulp-uglify` to compress our code, so that our production build is optimized.

Extension:
Set up a development environment for Gulp with Browserify that can be ran with `npm run gulp-dev`. Utilize `watchify` on the `browserify` instance. You'll have to set up a Gulp task called `dev` (which matches the task name that Gulp calls in our script for `npm run gulp-dev`). Define an event handler on the watchified browserify instance so that on `update` that the bundler re-runs the Babel/Sass transpilations and pipes the results to the destination folder with the correct destination file name. Make sure that in this task that we don't perform uglification. Note that this development environment is not taking advantage of live-reloading (because we are not utilizing a dev server with a websocket under the hood) so we have to refresh the page to see changes.
