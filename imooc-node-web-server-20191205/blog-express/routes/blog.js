// routes -> blog.js

var express = require('express');
var router = express.Router();


router.get('/list', function(req, res, next) {
  res.json({
      errno: 0,
      data: [1, 9]
  })
});







module.exports = router;

