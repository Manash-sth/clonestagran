const user = require('../model/user_model')
const errs = require('../services/errorHandling')

exports.GetOU = async(req, res) =>{
    const id = req.params.id
    console.log(id)

    try{
        if(id != ""){
            const usr = await user.findById(id)
            res.status(200).json(usr)
        }else{
            throw Error("DEV error")
        }

    }catch(err){
        res.status(400).json({"Error": errs.errHand(err)})
    }

}