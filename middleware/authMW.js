const jwt = require('jsonwebtoken')
const dec = require('jwt-decode')
const user = require('../model/user_model')
const errs = require('../services/errorHandling')


const tokenverify = async (req, res, next) =>{
    const token = req.get('Authorization')
    const secret = process.env.SECRET1

    try{
        if (token){
            var tok = ""
            if(token.startsWith('Bearer')){
                tok = token.split(" ")[1]
            }else{
                tok = token
            }
            const decoded = await dec(tok)
            const usr = await user.findById(decoded.id)

            if(!usr){
                throw Error("No user found")
            }

            const auth = jwt.verify(tok, secret+usr.logout, (err, deco)=>{
                if (err){
                    res.status(400).json({"Invalid": err})
                }else{
                    next()
                }
            })

        }else{
            throw Error("No token found")
        }
    }catch(err){
        res.status(400).json({"Error": errs.errHand(err)})
    }
}


module.exports = {tokenverify,}