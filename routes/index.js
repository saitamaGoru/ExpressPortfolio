var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Exrpess Portfolio'});
});
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home Page'});
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Me'});
});
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects Page'});
});
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Me'});
});
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services page'});
});

module.exports = router;
