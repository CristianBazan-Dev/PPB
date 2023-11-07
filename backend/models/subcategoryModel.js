const mongoose = require('mongoose'); 

const subcategoryModel = new mongoose.Schema({
        category: {
            type: String, 
            required: true, 
            trim: true,
        },
        name: {
            type: String, 
            required: true,
            trim: true,
            unique: true,  
        },
        mainCategoryName: {
            type: String,
            required: true, 
            trim: true 
        },
        images:{
            type: Object,
            required: false, 
        }
},{ 
    timestamps: true, 
})

module.exports = mongoose.model("Subcategory", subcategoryModel); 