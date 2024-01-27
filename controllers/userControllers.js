const userModel = require('../models/userModel');
var nodemailer = require('nodemailer');

const login = (req,res)=>{
    return res.render('login');
}

const register = (req,res) => {
    return res.render('register');
}

const dashboard = (req,res) => {
    return res.render('dashboard');
}

const registerUser = async(req,res) => {
    try {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        let cpassword = req.body.cpassword;

        let user = await userModel.create({
            name : name,
            email : email,
            password : password
        })
        if(user && user.password == cpassword){
            console.log('user Register');
            return res.redirect('/');
        }else{
            console.log("user not registered! check your confirm password"); 
            return false
        }
    } catch (error) {
        console.log(error);
        return false
    }
}

const loginUser = (req,res) => {
    return res.redirect('/dashboard');
}

const logout = (req,res) => {
    req.logout((error)=>{
        if(error){
            console.log('user not logout');
            return false;
        }
        return res.redirect('/');
    })
}

const header = (req,res) => {
    return res.render('header');
}

const footer = (req,res) => {
    return res.render('footer');
}

const userprofile = (req,res) => {
    try {
        return res.render('userprofile');  
    } catch (error) {
        console.log(error);
        return false
    }
}

const profileEdit = async(req,res) => {
    try {
        let profileId = await userModel.findById(req.body.profileid)
        let user = await userModel.findByIdAndUpdate(req.body.profileid,{
            email : req.body.email,
            password : req.body.password,
        })
        console.log("Category updated");
        return res.redirect('/dashboard');
    } catch (error) {
         console.log(error);
    return false;
    }
}

const forgotmail = async(req,res) => {
    try {
        let email = req.body.email;
        let otp = Math.floor(Math.random()*1000);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: '7952rutamavani@gmail.com',
              pass: 'slzf vkyg apsm qpyt'
            }
          });
          
          var mailOptions = {
            from: '7952rutamavani@gmail.com',
            to: email,
            subject: 'Otp :- ',
            html : `<h1>otp :- ${otp}</h1>`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              res.cookie('otp',{
                email,otp
              })
              return res.redirect('/otp');
            }
          });
    } catch (error) {
        console.log(error);
        return false;
    }
}

const forgot = (req, res)=> {
    return res.render('forgotPage');
}

const otp = (req,res) => {
    return res.render('otp');
}

const postOtp = (req,res) => {
    let userOtp = req.body.otp;
    if(userOtp == req.cookies['otp'].otp){
        return res.redirect('newPassword')
    }else{
        console.log('Otp is incorrect');
        return res.redirect('back');
    }
}

const newPassword = (req,res) => {
    return res.render('newPassword')
}

const Editnewpassword = async(req,res) => {
    try {
        let email = req.cookies['otp'].email;
        if(req.body.newpassword == req.body.cnewpassword){
            let updatePassword = await userModel.findOneAndUpdate({email:email},{
                password : req.body.newpassword
            })
            console.log("Password updated");
            res.clearCookie('otp');
            return res.redirect('/')
        }else{
            console.log("password and cpassword are mismatched");
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports =({
    login , register , dashboard , registerUser , loginUser , logout , header , footer , userprofile , profileEdit , forgot , otp , postOtp , forgotmail,newPassword , Editnewpassword
})