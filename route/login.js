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
app.post('/login',encoded,async(req,res)=>{
	var data=[req.body.uniqe_name,req.body.log_pass];
	var input1=[];
	var message="";
	if(data[0]=="")
	{
		message="Enter Your Uniqe Name";
		input1=[data[0],data[1]];
	}
	else
	{
		if(data[1]=="")
		{
			message="Enter Your Pasword";
			input1=[data[0],data[1]]
		}
		else
		{
			try
			{
				const userdata=await User.find({uniqe_name:data[0].trim().toLowerCase()});
				if(userdata.length===0)
				{
					message="Uniqe Name Is Not Found";
					input1=["",data[1]];
				}
				else
				{
					if(userdata[0].pass===data[1])
					{
						
						req.session.uniqe_name=userdata[0].uniqe_name.trim().toLowerCase();
						req.session.user_name=userdata[0].user_name.trim();
						req.session.user_pass=userdata[0].pass;
						req.session.update_text="Update Section";
						return res.redirect('/home');
					}
					else
					{
						message="Password Is Not Currect";
						input1=[data[0],""];
					}
				}
			}
			catch(err)
			{
				console.log(err);
			}
		}
	}
	res.render('login',{
		style2:[
			"block",
			"red",
			message
		],
		input1
	});
})
app.get('/login',(req,res)=>{
	if(req.session.uniqe_name)
	{
		res.redirect('/home');
	}
	else{
		res.render('login',{
		style2:[
			"none"
			]
		});
	}
});
module.exports=app;