const mongoose = require('mongoose'); 

const categoryModel = new mongoose.Schema({
        name: {
            type: String, 
            required: true,
            trim: true,
            unique: true,  
        },
        images:{
            type: Object,
            required: false, 
        },
        icon: {
            type: String, 
            required: false
        }
},{ 
    timestamps: true, 
})

module.exports = mongoose.model("Category", categoryModel); 