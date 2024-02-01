const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    category : {
        type : String,
        required : true
    },
    status : {
        type : Number,
        default : 1
    }
})
     
const categoryModel = mongoose.model('categorModel',categorySchema);

module.exports = categoryModel;