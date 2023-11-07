const mongoose = require('mongoose'); 

const productSchema = new mongoose.Schema({
    product_id: {
        type: String, 
        unique: true,
        trim: true, 
        required: true 
    }, 
    title: {
        type: String, 
        trim: true, 
        required: true,
    },
    offer: {
        type: Boolean, 
        required: false, 
    },
    old_price: {
        type: Number,
        required: false
    },
    usd: {
        type: Boolean, 
        required: false, 
        default: false, 
    }, 
    usd_price: {
        type: Number,
        required: false, 
    },
    usd_type: {
        type: Number, 
        required: false 
    }, 
    unit_price: {
        type: Number,
        required: true, 
        trim: true 
    }, 
    dues: {
        type: Number,
        required: false, 
    },
    transfer_offer: {
        type: Boolean, 
        required: false, 
    },
    transfer_offer_value: {
        type: Number,
        required: false, 
    },
    description: {
        type: String, 
        required: true, 
    },
    content: {
        type: String,
        required: true, 
    }, 
    images:{
        type: Object,
        required: true, 
    },
    category: {
        type: String, 
        required: true, 
    },
    subcategory: {
        type: String,
        required: false, 
    },
    secSubcategory: {
        type: String,
        required: false, 
    }, 
    checked: {
        type: String,
        default: false, 
    },
    sold: {
        type: Number,
        default: 0 
    },
    brand: {
        type: String,
        required: false, 
    },
    model: {
        type: String,
        required: false
    }
  
},{
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)