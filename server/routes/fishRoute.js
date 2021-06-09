const express = require("express");
var router = express.Router();
const fishRoute = require('../controllers/fishController')

router.get("/getFish", fishRoute.getFishes, (req, res) => {
  // res.send('test')
  res.status(200).json(res.locals.result)
})


module.exports = router;