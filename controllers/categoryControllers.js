const categoryModel = require('../models/categoryModel');
const extrasubcategoryModel = require('../models/extraSubCategoryModel');
const subcategoryModel = require('../models/subCategoryModel');

const category = async (req, res) => {
    try {
        let categoryAllData = await categoryModel.find({});
        return res.render('category/category', { record: categoryAllData });
    } catch (error) {
        console.log(error);
        return false;
    }
}

const add_category = (req, res) => {
    return res.render('category/add_category');
}

const post_category = async (req, res) => {
    try {
        let category = req.body.category;

        let postCategory = await categoryModel.create({
            category
        })
        console.log("user created category");
        return res.redirect('/category');

    } catch (error) {
        console.log(error);
        return false;
    }
}

const deleteCategory = async (req, res) => {
    try {
        let id = req.query.deleteId;

        let category = await categoryModel.findById(id);
        if (!category) {
            console.log("record is not found");
            return res.redirect('back');
        }

        let categoryDeleteData = await categoryModel.findByIdAndDelete(id);

        const deletesubCategory = await subcategoryModel.deleteMany({ categoryId: id });
        const extradeletesubCategory = await extrasubcategoryModel.deleteMany({ categoryId: id });

        console.log("Category Deleted");
        return res.redirect('back');
    } catch (error) {
        console.log(error);
        return false;
    }
}

const editCategory = async (req, res) => {
    try {
        let editRecord = await categoryModel.findById(req.query.editId);
        return res.render('category/categoryEdit', {
            single: editRecord
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const updateCategory = async (req, res) => {
    try {
        let updateCategory = await categoryModel.findByIdAndUpdate(req.body.editid, {
            category: req.body.category
        });
        console.log("record upadated");
        return res.redirect('category');

    } catch (error) {
        console.log(error);
        return false;
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
    category, add_category, post_category, deleteCategory, editCategory, updateCategory, categoryCancel, categoryPending

})