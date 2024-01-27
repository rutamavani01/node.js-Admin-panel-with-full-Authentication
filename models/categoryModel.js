const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    category : {
        type : String,
        required : true
    }
})

const categoryModel = mongoose.model('categorModel',categorySchema);

module.exports = categoryModel;