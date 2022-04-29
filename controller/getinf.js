const user = require('../model/user_model')
const errs = require('../services/errorHandling')

exports.GetInf = async(req, res) =>{
    const id = req.params.id
    console.log(id)

    try{
        if(id != ""){
            const usr = await user.findById(id)
            console.log(usr.avatar)
            res.status(200).json({"id":usr._id, "email": usr.email, "username":usr.uname, "bio": usr.bio, "follower": usr.follower, "following": usr.following, "post": usr.post, "avatar": usr.avatar})
        }else{
            throw Error("DEV error")
        }

    }catch(err){
        res.status(400).json({"Error": errs.errHand(err)})
    }

}