let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');
/* GET home page. */
router.get('/', indexController.displayMainPage);

router.get('/home', indexController.displayHomePage);

router.get('/about', indexController.displayAboutPage);

router.get('/projects', indexController.displayProjectsPage);

router.get('/contact', indexController.displayContactPage);

router.get('/services', indexController.displayServicesPage);
module.exports = router;
