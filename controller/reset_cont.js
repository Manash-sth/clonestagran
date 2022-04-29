const jwt = require('jsonwebtoken')
const user = require('../model/user_model')
const errs = require('../services/errorHandling')

const secret = process.env.SECRET2

exports.ResetPassword = async (req, res) =>{
    const {newpassword, renewpassword} = req.body
    const token = req.params.token

    try{
        const verify = jwt.verify(token, secret, async (err, dec)=>{
            if (err){
                res.status(400).json({"Error": errs.errHand(err)})
            }else{
                if(newpassword == renewpassword){
                    const usr = await user.resetpassword(dec.id, newpassword)
                    res.status(200).json({"Done":"Password changed successfully"})

                }else{
                    throw Error("Passwords donot match")
                }
            }
        })

    }catch (err){
        res.status(400).json({"Error": errs.errHand(err)})
    }
}