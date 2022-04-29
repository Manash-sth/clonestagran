const user = require('../model/user_model')
const token = require('../services/createToken')
const emailVal = require('email-validator')
const errs = require('../services/errorHandling')

exports.LogIn = async(req, res) =>{
    const {email, password} = req.body

    try{
        if(!emailVal.validate(email)){
            throw Error("Please enter a valid email")
        }
        if(email != "" && password != ""){
            const usr = await user.login(email, password)
            const toke = await token.genToken(usr._id, usr.role, "30d", usr.logout)
            console.log(toke)
            res.status(200).json({"token":toke, "id":usr._id, "email": usr.email, "username":usr.uname, "role": usr.role, "bio": usr.bio, "created": usr.created, "follower": usr.follower, "following": usr.following, "type": usr.type, "post": usr.post, "avatar": usr.avatar})
        }else{
            throw Error("Email or password missing")
        }

    }catch(err){
        console.log(err)
        res.status(400).json({"Error": errs.errHand(err)})
    }

}