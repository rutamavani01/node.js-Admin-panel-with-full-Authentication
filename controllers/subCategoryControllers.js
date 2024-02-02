const categoryModel = require('../models/categoryModel');
const extrasubcategoryModel = require('../models/extraSubCategoryModel');
const subcategoryModel = require('../models/subCategoryModel');

const subcategory = async(req,res) => {
    try {
        let subCategoryData = await subcategoryModel.find({}).populate('categoryId');
        return res.render('subcategory/subcategory',{
            subcategory  : subCategoryData
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const add_subcategory = async(req, res) => {
    try {
        let category = await categoryModel.find({});
        return res.render('subcategory/add_subcategory', {
            category
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const post_subcategory = async(req,res) => {
   try {
    let subcategory = await subcategoryModel.create({
        categoryId : req.body.category,
        subcategory : req.body.subcategory
    })
    console.log("Added subcategory");
    return res.redirect('back')
   } catch (error) {
    console.log(error);
        return false;
   }
}

const deletesubCategory = async(req, res) => {
    try {
        let id = req.query.deleteId;
        let deleteCategory = await subcategoryModel.findByIdAndDelete(id);
        let extraDelete = await extrasubcategoryModel.deleteMany({subcategoryId: req.query.deleteId});
        console.log("Data deleted");
        return res.redirect('back');
    } catch (error) {
        console.log(error);
        return false;
    }
}

const editsubCategory = async(req, res) => {
    try {
        let category = await categoryModel.find({});
        let single = await subcategoryModel.findById(req.query.editId).populate('categoryId');
        return res.render('subcategory/editSubCategory',{
            category , single
        });

    } catch (error) {
        console.log(error);
        return 
    }
}

const updateSubCategory = async(req, res) => {
    try {
        await subcategoryModel.findByIdAndUpdate(req.body.editid,{
            categoryId : req.body.category,
            subcategory : req.body.subcategory
        })
        console.log("Data saved successfully");
        return res.redirect('/subcategory');
    } catch (error) {
        console.log(error);
        return false;
    }  
}

const categoryPending = async (req, res) => {
    try {
        let pending = await subcategoryModel.findByIdAndUpdate(req.query.id,{
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
        let cancel = await subcategoryModel.findByIdAndUpdate(req.query.id,{
            status : 1
        });
return res.redirect('back');
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = ({
    subcategory , add_subcategory , post_subcategory , editsubCategory , deletesubCategory , updateSubCategory , categoryPending , categoryCancel
})