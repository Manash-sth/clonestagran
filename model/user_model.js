const mongoose = require('mongoose')
const bycrypt = require('bcrypt')

const user = mongoose.Schema({
    uname: {
        type: String,
        require: true,
        unique: true,
        maxLength: 20,
    },
    fname: {
        type: String,
        require: true
    },
    lname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    bio: {
        type: String,
        maxLength: 100
    },
    password: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
        require: true,
        default: "Not Specified"
    },
    created:{
        type: Date,
        required: true,
        default: Date.now
    },
    role:{
        type: String,
        required: true,
        default: 'User'
    },
    is_active:{
        type: Boolean,
        required: true,
        default: false
    },
    logout:{
        type: Date,
        required: true,
        default: Date.now
    },
    follower: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    type:{
        type: String,
        required: true,
        default: 'Public'
    },
    post: {
        type: Array, 
        default: []
    },
    bookmarks: {
        type: Array, 
        default: []
    },
    avatar:{
        type: String,
        default: ""
    },
    otp:{
        type: Number,
        default:""
    }
})

user.pre('save', async function(next){
    const salt = await bycrypt.genSalt()
    const hashed = await bycrypt.hash(this.password, salt)
    this.password = hashed
    next()
})

user.statics.login = async function(email, password) {
    const usr = await this.findOne({email})
    if(usr){
        if(usr.is_active){
            const auth = await bycrypt.compare(password, usr.password)
            if(auth){
                return usr
            }throw Error("Incorrect Email or password")
        }throw Error("User not verified") 

    }throw Error("Incorrect Email or password")
}

user.statics.changepassword = async function(id, oldpassword, newpassword){
    const usr = await this.findOne({_id: id})
    if(usr){
        const auth = await bycrypt.compare(oldpassword, usr.password)
        if (auth){
            const salt = await bycrypt.genSalt()
            const hashed = await bycrypt.hash(newpassword, salt)
            await usr.updateOne({password: hashed})
            return usr
        }throw Error("Incorrect password")
    }throw Error("No user found")
}

user.statics.resetpassword = async function(id, newpassword){
    const usr = await this.findOne({_id: id})
    if(usr){
        const salt = await bycrypt.genSalt()
        const hashed = await bycrypt.hash(newpassword, salt)
        await usr.updateOne({password: hashed})
        return usr
    }throw Error("No user found")
}

module.exports = mongoose.model("User", user)