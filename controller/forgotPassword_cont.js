const user = require('../model/user_model')
const sendm = require('../services/sendemail')
const errs = require('../services/errorHandling')

const e_sub = "Reset Password"
const e_body = "Thy request to reset password has been heard. <br> Mortal, thus I shall grant thee the reset code: <br>"


exports.ForgotPassword = async (req, res) =>{
    const {email} = req.body

    try{
        const usr = await user.findOne({email})
        console.log(usr)
        if (usr){
            if(usr.is_active == true){
                const fodig = Math.floor(1000 + Math.random() * 9000)
                const upd = await usr.updateOne({otp: fodig})
                console.log(fodig)
                await sendm.sendmail(email, e_sub, e_body + fodig)
                res.status(200).json({"Email": "Check your email for the 4-digit code", "id": usr._id})
            }else{
                throw Error("User not activated yet")
            }

        }else{
            throw Error("No user found")
        }

    }catch(err){
        res.status(400).json({"Error": errs.errHand(err)})

    }
}

////Create new model that saves user id, 6digit code and attempts to reset. Once the attempt is more than 3 times, deactivate the account.