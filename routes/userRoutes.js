const express = require('express');

const routes = express.Router();



const userControllers = require('../controllers/userControllers');
const categoryControllers = require('../controllers/categoryControllers');
const subcategorycontrollers = require('../controllers/subCategoryControllers');
const extraSubCategoryControllers = require('../controllers/extraSubCategoryControllers');
const productControllers = require('../controllers/productControllers')

const passport = require('passport');
// multer
// multer
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const imageupload = multer({ storage: storage }).single('image');

// userControllers
routes.get('/',userControllers.login);
routes.get('/register',userControllers.register);
routes.post('/registerUser',userControllers.registerUser)
routes.get('/dashboard',passport.checkUser,userControllers.dashboard);

routes.post('/loginUser',passport.authenticate('local',{failureRedirect:'/'}),userControllers.loginUser);
routes.get('/logout',userControllers.logout);

routes.get('/otp',userControllers.otp);
routes.post('/postOtp',userControllers.postOtp);

routes.get('/forgot',userControllers.forgot);
routes.post('/forgotmail',userControllers.forgotmail);

routes.get('/newpassword',userControllers.newPassword);
routes.post('/Editnewpassword',userControllers.Editnewpassword);

routes.get('/header',userControllers.header);
routes.get('/footer',userControllers.footer);  
routes.get('/userprofile',userControllers.userprofile);
routes.post('/profileEdit',userControllers.profileEdit);


// categotyControllers
routes.get('/category',categoryControllers.category);
routes.get('/add_category',categoryControllers.add_category);
routes.post('/post_category',categoryControllers.post_category);
routes.get('/deleteCategory',categoryControllers.deleteCategory);
routes.get('/editCategory',categoryControllers.editCategory);
routes.post('/updateCategory',categoryControllers.updateCategory);

// sub category
routes.get('/subcategory',passport.checkUser,subcategorycontrollers.subcategory);
routes.get('/add_subcategory',passport.checkUser,subcategorycontrollers.add_subcategory)
routes.post('/post_subcategory',passport.checkUser,subcategorycontrollers.post_subcategory);
routes.get('/deletesubCategory',passport.checkUser,subcategorycontrollers.deletesubCategory);
routes.get('/editsubCategory',passport.checkUser,subcategorycontrollers.editsubCategory);
routes.post('/updateSubCategory',passport.checkUser,subcategorycontrollers.updateSubCategory);

// extra sub category
routes.get('/extra_subcategory',passport.checkUser,extraSubCategoryControllers.extra_subcategory);
routes.get('/extra_add_subcategory',passport.checkUser,extraSubCategoryControllers.extra_add_subcategory);
routes.post('/post_extra_add_subcategory',passport.checkUser,extraSubCategoryControllers.post_extra_add_subcategory);
routes.get('/deleteextrasubCategory',passport.checkUser,extraSubCategoryControllers.deleteextrasubCategory);
routes.get('/editextrasubCategory',passport.checkUser,extraSubCategoryControllers.editextrasubCategory);
routes.post('/updateextrasubCategory',passport.checkUser,extraSubCategoryControllers.updateextrasubCategory);

// product 
routes.get('/product',passport.checkUser,productControllers.product);
routes.get('/product_add',imageupload,passport.checkUser,productControllers.product_add);
routes.post('/post_product',imageupload,passport.checkUser,productControllers.post_product);
routes.get('/deleteProduct',imageupload,passport.checkUser,productControllers.deleteProduct);
routes.get('/editProduct',imageupload,passport.checkUser,productControllers.editProduct);
routes.post('/updateProduct',imageupload,passport.checkUser,productControllers.updateProduct);

module.exports = routes; 