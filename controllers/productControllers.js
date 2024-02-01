const productModel = require('../models/productModel');
const categoryModel = require('../models/categoryModel')
const subCategoryModel = require('../models/subCategoryModel');
const extraSubCategoryModel = require('../models/extraSubCategoryModel');
const fs = require('fs');

const product = async(req, res) => {
    try {
        let product = await productModel.find({}).populate('categoryId').populate('subcategoryId').populate('extrasubcategoryId');
        return res.render('product/product',{
            product
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const product_add = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        const subcategory = await subCategoryModel.find({});
        const extrasubcategory = await extraSubCategoryModel.find({});

        return res.render('product/product_add', {
            category, subcategory, extrasubcategory
        });
    } catch (error) {
        console.log(error);
        return false;
    }
}

const post_product = async (req, res) => {
    try {
        let imagename = '';
        if (req.file) {
            imagename = req.file.path
        }
          await productModel.create({
            categoryId: req.body.category,
            subcategoryId: req.body.subcategory,
            extrasubcategoryId: req.body.extrasubcategory,
            name: req.body.name,
            price: req.body.price,
            qty: req.body.qty,
            desc: req.body.desc,
            image: imagename
        })
        console.log("Successfully product added");
        return res.redirect('/product');
    } catch (error) {
        console.log(error);
        return false;
    }
}

const deleteProduct = async(req,res) => {
    try {
        let deleteFile = await productModel.findById(req.query.deleteId);
        fs.unlinkSync(deleteFile.image);

        let deleteProduct = await productModel.findByIdAndDelete(req.query.deleteId);
        console.log("Delete product");
        return res.redirect('back');
    } catch (error) {
        console.log(error);
        return false;
    }
}

const editProduct = async(req,res) => {
    try {
        let editProduct = await productModel.findById(req.query.editId).populate('categoryId').populate('subcategoryId').populate('extrasubcategoryId');
        const category = await categoryModel.find({});
        const subcategory = await subCategoryModel.find({});
        const extrasubcategory = await extraSubCategoryModel.find({});
        return res.render('product/product_edit',{
            single : editProduct , category , subcategory , extrasubcategory
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const updateProduct = async(req,res) => {
    if(req.file){
        try {
            let oldImage = await productModel.findById(req.body.editid);
            fs.unlinkSync(oldImage.image);
        } catch (error) {
            console.log(error);
            return false;
        }

        try {
            let editData = await productModel.findByIdAndUpdate(req.body.editid,{
                category : req.body.category,
                subcategory : req.body.subcategory,
                extrasubcategory : req.body.extrasubcategory,
                name : req.body.name,
                price : req.body.price,
                qty : req.body.qty,
                desc : req.body.desc,
                image : req.file.path
            });
            console.log("Updated");
            return res.redirect('/product');
        } catch (error) {
           console.log(error);
           return false; 
        }
    }else{
        try {
            let editid = await productModel.findById(req.body.editid);
            let update = await productModel.findByIdAndUpdate(req.body.editid,{
                category : req.body.category,
                subcategory : req.body.subcategory,
                extrasubcategory : req.body.extrasubcategory,
                name : req.body.name,
                price : req.body.price,
                qty : req.body.qty,
                desc : req.body.desc,
                image : editid.image
            }); 
            console.log("Updated");
            return res.redirect('/product');
        } catch (error) {
           console.log(error);
           return false; 
        }
    }
}

const categoryPending = async (req, res) => {
    try {
        let pending = await categoryModel.findByIdAndUpdate(req.query.id,{
            status : 0
        });
        return res.redirect('back');

    } catch (error) {
        console.log(error);
        return false;
    }
}

const categoryCancel = async(req, res) => {
    try {
        let cancel = await categoryModel.findByIdAndUpdate(req.query.id,{
            status : 1
        });
return res.redirect('back');
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = ({
    product, product_add, post_product , deleteProduct , editProduct , updateProduct , categoryPending , categoryCancel
})