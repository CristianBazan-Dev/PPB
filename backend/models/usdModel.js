const mongoose = require('mongoose'); 

const usdModel = new mongoose.Schema({
    usd: {
        type: Number, 
        require: true
    },
    usd_blue: {
        type: Number,
        require: false, 
    }
}, {
    timestamps
})


module.exports = mongoose.model('USD', usdModel )