const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    complaint: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    system_detail: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true

    },
    // photo: {
    //     name: String,
    //     desc: String,
    //     img: {
    //         data: Buffer,
    //         contentType: String
    //     }
    //},
    start_date: {
        type: Date,
        default: Date.now,
    }
})
module.exports = mongoose.model('Posts', PostSchema);