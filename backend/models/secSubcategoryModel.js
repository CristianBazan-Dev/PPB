const mongoose = require('mongoose'); 

const secSubcategoryModel = new mongoose.Schema({
    mainCategoryId: {
        type: String, 
        required: true,
        trim: true
    },
    subcategoryId: {
        type: String, 
        required: true, 
        trim: true
    },
    name: {
        type: String,
        required: true, 
        trim: true 
    },
    images: {
        type: Object, 
        required: false, 
    }


}, {
    timestamps: true, 
})

module.exports = mongoose.model("SecondSubcategory", secSubcategoryModel); 