const categoryModel = require('../models/categoryModel');
const subcategoryModel = require('../models/subCategoryModel');
const extrasubcategoryModel = require('../models/extraSubCategoryModel');

const extra_subcategory = async (req, res) => {
    try {
        let extrasubcategory = await extrasubcategoryModel.find({}).populate('categoryId').populate('subcategoryId')
        return res.render('extrasubcategory/extra_subcategory',{
            extrasubcategory
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const extra_add_subcategory = async (req, res) => {
    try {
        let category = await categoryModel.find({})
        let subcategory = await subcategoryModel.find({});

        return res.render('extrasubcategory/extra_add_subcategory', {
            category, subcategory
        });
    } catch (error) {
        console.log(error);
        return false;
    }
}

const post_extra_add_subcategory = async (req, res) => {
    try {
        let extra_category = await extrasubcategoryModel.create({
            categoryId: req.body.category,
            subcategoryId: req.body.subcategory,
            extrasubcategory: req.body.extrasubcategory
        })
        console.log("adding extra category");
        return res.redirect('back')
    } catch (error) {
        console.log(error);
        return false;
    }
}

const deleteextrasubCategory = async(req, res) => {
    try {
        let extrasubDelete = await extrasubcategoryModel.findByIdAndDelete(req.query.deleteId);
        console.log("data delete");
        return res.redirect('back');
    } catch (error) {
        console.log(error);
        return false;
    }
}

const editextrasubCategory = async(req,res) => {
    try {
        let category = await categoryModel.find({})
        let subcategory = await subcategoryModel.find({})
        let single = await extrasubcategoryModel.findById(req.query.editId).populate('categoryId').populate('subcategoryId')
        return res.render('extrasubcategory/extra_editSubCategory',{
            category  , single  , subcategory
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const updateextrasubCategory = async(req,res) => {
    console.log(req.body.editid)
    try {
        let update = await extrasubcategoryModel.findByIdAndUpdate(req.body.editid,{
            categoryId : req.body.category,
            extrasubcategory: req.body.extrasubcategory,
        })
        console.log("update category");
        return res.redirect('/extra_subcategory')
    } catch (error) {
        console.log(error);
        return false;
    }
}

const categoryPending = async (req, res) => {
    try {
        let pending = await extrasubcategoryModel.findByIdAndUpdate(req.query.id,{
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
        let cancel = await extrasubcategoryModel.findByIdAndUpdate(req.query.id,{
            status : 1
        });
return res.redirect('back');
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = ({
    extra_subcategory, extra_add_subcategory, post_extra_add_subcategory , deleteextrasubCategory , editextrasubCategory , updateextrasubCategory , categoryPending , categoryCancel
})