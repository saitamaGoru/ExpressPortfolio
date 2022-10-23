let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Contact = require('../models/contact.js');

module.exports.displayContactList = (req, res, next) => {
    Contact.find((err, contactList) => {
        if (err) {
            return console.error(err);
        }
        else {
          
            res.render('contact/index', {
                title: 'Contacts',
                contactList: contactList
            });
        }
    });
}

module.exports.displayAddPage = (req,res,next) => { 

    res.render('contact/add' ,  {
        title:'Add new Contact'

    });
}

module.exports.processAddPage = (req,res,next) =>{
    console.log(req.body);
 let newContact = Contact({
        "name":req.body.name,
        "number":req.body.number,
        "email":req.body.email
    });
    Contact.create(newContact,(err, Contact) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else{
            //refresh contact list
            res.redirect('/business-contact-list');
        }
    });
}


module.exports.displayEditPage = (req,res,next)=>{
    let id = req.params.id;

    Contact.findById(id,(err,contactToEdit)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else{
            res.render('contact/edit', {title:'Edit Contact', contact:contactToEdit})
        }
    });

}

module.exports.processEditPage = (req,res,next)=>{
    let id = req.params.id

   let updateContact = Contact({
    "_id":id,
    "name":req.body.name,
    "number":req.body.number,
    "email":req.body.email
   });

   Contact.updateOne({_id: id}, updateContact, (err)=>{
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else{
        res.redirect('/business-contact-list');
    }
   });

}

module.exports.processDeletePage = (req,res,next)=>{
    let id= req.params.id
    Contact.remove({_id: id}, (err)=>{
        if(err)
    {
        console.log(err);
        res.end(err);
    }
    else{
        res.redirect('/business-contact-list');
    }
    });

}

