const user = require('../model/user_model')
const errs = require('../services/errorHandling')

exports.Changepassword = async (req, res) =>{
    const {id, oldpassword, newpassword, renewpassword} = req.body

    try{
        if(oldpassword != "" && newpassword != "" && renewpassword != ""){
            if(newpassword == renewpassword){
                const cuser = await user.changepassword(id, oldpassword, newpassword)
                res.status(200).json({"Changed": "Password changed successfully"})
    
            }else{
                throw Error("New passwords do not match")
            }
        }else{
            throw Error("Fill all fields")
        }
    }catch(err){
        res.status(400).json({"Error": errs.errHand(err)})
    }


}