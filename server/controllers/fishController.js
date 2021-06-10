const fetch = require('node-fetch');
const fishController = {}
/* exports.fishController = (req, res) => {
  res.json({
    SpeciesName: ['White Hake', 'Atlantic Chub Mackerel', 'Shortfin Squid']
  })
} */

fishController.getFishes = function (req, res, next) {
  console.log('testing')
  let result;

  fetch('https://www.fishwatch.gov/api/species')
    .then(res => res.json())
    .then(json => {
      res.locals.result = json;
      // console.log(result[0])
      // console.log('RES.LOCALS:', res.locals.result)
      return next();
    })
    .catch(e => {
      return next(e);
    })
  // console.log('testingfishescontroller')
  // return next();
}

fishController.postFishes = function (req, res, next) {
  console.log('testing')
  let result;
  console.log(req.body);

  /*  fetch('https://www.fishwatch.gov/api/species')
     .then(res => res.json())
     .then(json => {
       req.body = json;
       console.log(req.body)
       return next();
     })
     .catch(e => {
       return next(e);
     }) */
}





module.exports = fishController;