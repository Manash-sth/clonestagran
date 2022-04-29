const user = require('../model/user_model')
const token = require('../services/createToken')
const errs = require('../services/errorHandling')

exports.OTP = async (req, res) =>{
    const {code, id} = req.body

    try{
        const usr = await user.findById(id)

        if(usr.otp == code){
            const toke = await token.genTok(usr._id, '10m')
            console.log("Wahaha")
            res.status(200).json({"resetLink": `http://192.168.0.103:5000/api/resetpass/${toke}`})

        }else{
            res.status(400).json({"Error": 'Wrong OTP, Try again!'})
        }

    }catch (err){
        res.status(400).json({"Error": errs.errHand(err)})
    }
    
}