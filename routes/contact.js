let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');



let Contact = require('../models/contact.js');
let contactController = require('../controllers/contact')

router.get('/', contactController.displayContactList);


router.get('/add' , contactController.displayAddPage);

 
router.post('/add', contactController.processAddPage);


router.get('/edit/:id', contactController.displayEditPage);
  
router.post('/edit/:id', contactController.processEditPage);
   
 
router.get('/delete/:id', contactController.processDeletePage);

module.exports = router;