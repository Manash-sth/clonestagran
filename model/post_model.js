const mongoose = require('mongoose')
const usr = require('./user_model')

const post = mongoose.Schema({
    post_id: {
        type: String,
        require: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.ObjectId, 
        ref: "User", 
        required:true
    },
    uname: {
        type: String,
        require: true
    },
    created:{
        type: Date,
        required: true,
        default: Date.now
    },
    image:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        max: 100,
    },
    like: {
        type: Array,
        default: []
    },
    comment: {
        type: Array,
        default: []
    },
})

// post.virtual('posts').get(async function(){
//     const usrr = await usr.findById(this.user)
//     this.user = usrr
//     return this
// })


module.exports = mongoose.model("Post", post)




