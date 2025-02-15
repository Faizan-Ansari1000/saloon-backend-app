const mognoose = require('mongoose');

const userComplainSchema = mognoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
})

const Complain = mognoose.model('complain', userComplainSchema);
module.exports = Complain;