const mongoose = require('mongoose');

const updateSchema = mongoose.Schema({
    name: {
        type: String
    },
    category: {
        type: String
    },
    price: {
        type: String
    },
    limitedTime: {
        type: String
    },
})

const Update = mongoose.model('update', updateSchema);
module.exports = Update;