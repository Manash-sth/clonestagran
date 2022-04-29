const user = require('../model/user_model')
const emailVal = require('email-validator')
const sendm = require('../services/sendemail')
const token = require('../services/createToken')
const errs = require('../services/errorHandling')

const e_sub = "E-mail address Confirmation"
const e_body= "Please click the like below to verify your email<br>"


exports.SignUp = async(req, res) => {
    const {uname, email, firstname, lastname, password, repassword} = req.body
    console.log("Hello")
    try{
        if(!emailVal.validate(email)){
            throw Error("Please enter a valid email")
        }
        if(uname != "" && email != "" && firstname != "" && lastname != "" && password != "" && repassword != ""){
                if (password == repassword){
                    const usr = new user({
                        uname: uname,
                        email: email,
                        fname: firstname,
                        lname: lastname,
                        password: password,
                    })
                    const newuser = await usr.save()
                    const toke = await token.genTok(newuser._id, "15m")
                    await sendm.sendmail(newuser.email, e_sub, e_body + `Click <a href = "http://127.0.0.1:5000/api/emailconf/${toke}">here<a> !`)

                    res.status(200).json({"User":"User created successfully"})
                }else{
                    throw Error("Password Doesn't match")
                }
        }else{
            throw Error("Fill all field")
        }

    }catch(err){
        res.status(400).json({"Error": errs.errHand(err)})
    }

}