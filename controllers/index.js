let express = require('express');
let router = express.Router();

module.exports.displayMainPage = (req,res,next)=>{
    res.render('index',{title:'Express Portfolio'});
}

module.exports.displayHomePage = (req,res,next)=>{
    res.render('home',{title:'Home Page'});
}


module.exports.displayAboutPage = (req,res,next)=>{
    res.render('about',{title:'About Me'});
}

module.exports.displayProjectsPage = (req,res,next)=>{
    res.render('projects',{title:'Projects Page'});
}

module.exports.displayContactPage = (req,res,next)=>{
    res.render('contact',{title:'Contact Me'});
}

module.exports.displayServicesPage = (req,res,next)=>{
    res.render('services',{title:'Services page'});
}