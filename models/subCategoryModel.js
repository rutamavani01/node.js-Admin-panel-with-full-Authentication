const mongoose = require('mongoose');

const SubcategorySchema = mongoose.Schema({
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categorModel'
    },
    subcategory : {
        type : String,
        required : true
    },
    status: {
        type : Number,
        default : 1
    }      
})

const subcategoryModel = mongoose.model('subcategoryModel',SubcategorySchema);

module.exports = subcategoryModel;