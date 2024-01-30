const express = require('express');

const port = 8000;

const app = express();

const path = require('path');

app.use(express.urlencoded()); 

app.set('view engine','ejs');
   
const db = require('./config/db');

app.use(express.static(path.join(__dirname,'/public')))

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

const passport = require('passport');
const passportLocal = require('./config/passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
          
app.use(session({
    name : 'admin panel', 
    secret : 'admin panel',
    saveUninitialized : true,
    resave : true,
    cookie : {     
        maxAge: 60 * 24 * 24 * 1000 
    }                                                                          
}))

app.use(cookieParser());

app.use(passport.initialize()) 
app.use(passport.session());
app.use(passport.setUser);

app.use('/',require('./routes/userRoutes')); 

app.listen(port,(error)=>{
    if(error){
        console.log(error);
        return false;
    } 
    console.log(`server is start on port :- ${port}`);
})      