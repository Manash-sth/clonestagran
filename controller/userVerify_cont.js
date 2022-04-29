const jwt = require('jsonwebtoken')
const user = require('../model/user_model')
const errs = require('../services/errorHandling')


const verified_res = "Email verified. You can now continue to use our services."

const secret = process.env.SECRET2

exports.UserEmailVerify = async (req, res) => {
    const token = req.params.token

    try{
        const verify = jwt.verify(token, secret, async (err, dec)=>{
            if (err){
                res.status(400).send("Some Error occured. Try")
            }else{
                const usr = await user.findOne({_id: dec.id})
                await usr.updateOne({is_active: true})
                res.status(200).send('<h1>'+"Clonestagram"+'<h1> <p>'+ verified_res +'<p>')
            }
        })
    }catch(err){
        res.status(400).json({"Error": errs.errHand(err)})

    }
}