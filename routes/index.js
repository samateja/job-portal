var express = require('express');
var router = express.Router();
import serverRender from '../serverRender';

/* GET home page. */
router.get(['/'], function(req, res, next) {
  const initialMarkup = serverRender().initialMarkup;
  res.render('layout.ejs', { title: 'Experteer Jobs', initialMarkup});
});
router.get('/job/:jobId', function (req, res) {
  res.redirect('/');
});

module.exports = router;
