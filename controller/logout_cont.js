const user = require('../model/user_model')
const jwtdec = require('jwt-decode')
const errs = require('../services/errorHandling')

exports.Logout = async(req, res) => {
    var token = req.get("Authorization")
    try{
        if (token){
            var tok = ""
            if(token.startsWith('Bearer')){
                tok = token.split(" ")[1]
            }else{
                tok = token
            }
            const decoded = await jwtdec(tok)
            id = decoded.id

        }else{
            throw Error("No token found")
        }

        const usr = await user.findById(id)
        if(usr){
            await usr.updateOne({logout: Date.now()})
            res.status(200).json({"Logout": "Logged out"})
        }else{
            throw Error("No user found")
        }

    }catch(err){
        res.status(400).json({"Error": errs.errHand(err)})
    }
}