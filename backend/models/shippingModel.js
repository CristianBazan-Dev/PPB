const mongoose = require('mongoose'); 

const shippingSchema = new mongoose.Schema({
    product_id: {
        type: String, 
        unique: true,
        trim: true, 
        required: true 
    }, 
    state: {
        type: String, 
        trim: true, 
        required: true,
    },
    unit_price: {
        type: Number,
        required: true, 
        trim: true 
    },
    postal_code: {
        type: Number, 
        required: false, 
    },
    origin_zone: {
        type: Number,
        required: false, 
        default: 2, 
    },
    zone: {
        type: Number,
        required: true, 
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Shipping', shippingSchema)