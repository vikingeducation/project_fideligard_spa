var express = require('express');
var router = express.Router();
const { quandlManager } = require("../utils")

router.get('/', function(req, res, next) {
  res.json( { response: 'success' });
});

router.get('/stocks', (req, res) =>{
  quandlManager.get();
  res.json({
    response: 'stocks'
  })
})

module.exports = router;
