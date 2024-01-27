const passportLocal = require('passport-local');

const userModel = require('../models/userModel');

const passport = require('passport');

passport.use(new passportLocal({
    usernameField:'email'
},async(email,password,done)=>{
    try {
        const user = await userModel.findOne({email : email});
        if(!user || user.password != password){
            console.log("Password and email is incorrect");
            return done(null,false);
        } 
        return done(null,user);
    } catch (error) {
        console.log(error);
        return false;
    }
}))

passport.serializeUser((user,done)=>{
    return done(null,user._id);
})

passport.deserializeUser(async(id,done)=>{
    try {
        const user = await userModel.findById(id);
        return done(null,user);
    } catch (error) {
        console.log(error);
        return done(null,false)
    }
})

passport.checkUser = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

passport.setUser = (req,res,next) => {
    if(req.isAuthenticated()){
        res.locals.users = req.user
    }
    return next();
}

module.exports = passport;