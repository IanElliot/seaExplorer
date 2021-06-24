const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const fishRoute = require("./routes/fishRoute")

app.use(express.json())

app.use("/fish", fishRoute)


// statically serve everything in the build folder on the route '/build
app.use('/build', express.static(path.join(__dirname, '../build')));

// serve index.html on the route '/'
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
})

/* app.get('/Favorites', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
}) */

// error handlers

app.use('*', (req, res) => {
  res.status(404).send("Page Not Found")
})


function errorHandler(err, req, res, next) {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: {
      err: 'An error occured'
    }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.sendStatus(errorObj.status).json(errorObj.message);
  // res.status(500);
  // res.render('error', { error: err });
}

app.listen(3000, function () {
  console.log('express server is listening')
}); //listens on port 3000 -> http://localhost:3000/