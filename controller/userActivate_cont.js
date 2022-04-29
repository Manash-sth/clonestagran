const user = require('../model/user_model')
const sendm = require('../services/sendemail')
const token = require('../services/createToken')
const errs = require('../services/errorHandling')

const lto = process.env.LinkE

const e_sub = "E-mail address Confirmation"
const e_body= "Please click the like below to verify your email<br>"

exports.UserActivate = async(req, res) => {
    const {email} = req.body
    try{
        if(email != ""){
            const usr = await user.findOne({email: email})
            if (usr){
                if(usr.is_active == false){
                    const toke = await token.genTok(usr._id, '10m')
                    await sendm.sendmail(email, e_sub, e_body + `Click <a href = "http://127.0.0.1:5000/api/emailconf/${toke}">here<a> !`)
                    res.status(200).json({"User":"Link Sent. Please check your Email."})
                }else{
                    throw Error("User already active")
                }
                
            }else{
                throw Error("No user with such email exists.")
            }

        }else{
            throw Error("Fill all field")
        }

    }catch(err){
        console.log(err)
        res.status(400).json({"Error": errs.errHand(err)})
    }

}