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
app.post('/',encoded,async(req,res)=>{
	var data=[req.body.name,req.body.uniqe,req.body.pass];
	input=[];
	var message="";
	var bool1=true;
	for(var i=0;i<3;i++)
	{
		if(data[i]=="")
		{
			bool1=false;
			break;
		}
		else
		{
			bool1=true;
		}
	}
	if(bool1)
	{
		if(data[2].length>=6)
		{
			const userdata=await User.find({uniqe_name:data[1].trim().toLowerCase()});
			if(userdata.length===0)
			{
				const saveUser=new User({
					_id:new mongoose.Types.ObjectId,
					user_name:data[0].trim(),
					uniqe_name:data[1].trim().toLowerCase(),
					pass:data[2]
				});
				const saveData=await saveUser.save();
				message="Sucessflly Submited";
			}
			else
			{
				input=[req.body.name,"",req.body.pass];
				message="Uniqe Name Is  Already Exists";
			}
		}
		else
		{
			input=[req.body.name,req.body.uniqe,""];
			message="Mininam Length is 6";
		}
	}
	else
	{
		input=[req.body.name,req.body.uniqe,req.body.pass];
		message="Fill All Input Box";
	}
	res.render('index',{
		style1:[
			"block",
			"red",
			message
		],
		input
	})
});
app.get('/',async(req,res)=>{
	if(req.session.uniqe_name)
	{
		res.redirect('/home');
	}
	else
	{
		res.render('index',{
			style1:[
				"none"
			]
		});
	}
});
module.exports=app;