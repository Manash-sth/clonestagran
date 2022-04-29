const mongoose = require('mongoose')

const tag = mongoose.Schema({
    tag_id: {
        type: String,
        require: true,
        unique: true
    },
    post: {
        type: Array, 
        default: []
    },
})

module.exports = mongoose.model("Tag", tag)




