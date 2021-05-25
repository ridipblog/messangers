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
app.post('/user_name',encoded,async(req,res)=>{
	if(req.session.uniqe_name)
	{
		var user_name=req.body.user_name;
		user_name=user_name.trim();
		if(user_name=="")
		{
			req.session.update_text="Enter User Name";
			return res.redirect('/home');
		}
		else
		{
			if(req.session.user_name==user_name)
			{
				req.session.update_text="Same User Name";
				return res.redirect('/home');
			}
			else
			{
				const userupdate=await User.updateOne({uniqe_name:req.session.uniqe_name},{
					user_name:user_name
				});
				req.session.user_name=user_name;
				req.session.update_text="User Name Updated";
				return res.redirect('/home');
			}
		}
	}
	else
	{
		res.redirect('/login');
	}
});
app.post('/uniqe_name',encoded,async(req,res)=>{
	if(req.session.uniqe_name)
	{
		var uniqe_name=req.body.uniqe_name;
		uniqe_name=uniqe_name.trim().toLowerCase();
		if(uniqe_name=="")
		{
			req.session.update_text="Enter Uniqe Name";
			return res.redirect('/home');
		}
		else
		{
			if(req.session.uniqe_name==uniqe_name)
			{
				req.session.update_text="Same Uniqe Name";
				return res.redirect('/home');
			}
			else
			{
				const userdata=await User.find({uniqe_name:uniqe_name});
				if(userdata.length===0)
				{
					const userupdate=await User.updateOne({uniqe_name:req.session.uniqe_name},{
						uniqe_name:uniqe_name
					});
					req.session.uniqe_name=uniqe_name
					req.session.update_text="Uniqe Name Updated";
					return res.redirect('/home');
				}
				else
				{
					req.session.update_text="Uniqe Name Already Taken";
					return res.redirect('/home');
				}
			}
		}
	}
	else
	{
		return res.redirect('/login');
	}
});
app.post('/user_pass',encoded,async(req,res)=>{
	if(req.session.uniqe_name)
	{
		var user_pass=req.body.user_pass;
		if(user_pass=="")
		{
			req.session.update_text="Enter New Password";
			return res.redirect('/home');
		}
		else
		{
			if(user_pass.length>=6)
			{
				const userupdate=await User.updateOne({uniqe_name:req.session.uniqe_name},{
					pass:user_pass
				});
				req.session.user_pass=user_pass
				req.session.update_text="Password Updated";
				return res.redirect('/home');
			}
			else
			{
				req.session.update_text="Password Length Must Be 6";
				return res.redirect('/home');
			}
		}
	}
	else
	{
		return res.redirect('/login');
	}
});
module.exports=app;