const express=require('express');
const app=express();
const path=require('path');
const hbs=require('hbs');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const env=require('dotenv');
const cookieParser=require('cookie-parser');
const session=require('express-session');
app.set('view engine','hbs');
app.use('/public',express.static('public'));
const encoded=bodyParser.urlencoded({extended:true});
env.config({path:'../require/config.env'});
const User=require('../models/users');
require('../require/connection.js');
app.use(session({secret:"cookie",resave:true,saveUninitialized:true}));
app.get('/search',async(req,res)=>{
	if(req.session.uniqe_name)
	{
		const userdata=await User.find({});
		res.render('search',{
			data:userdata
		});
	}
	else
	{
		res.redirect('/login');
	}
})
module.exports=app;