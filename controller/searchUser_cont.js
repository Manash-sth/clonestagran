const user = require('../model/user_model')
const errs = require('../services/errorHandling')

exports.SearchUser = async(req, res) =>{
    const usrname = req.body.usrname
    console.log(usrname)

    try{
        if(usrname != "" ){
            const usrs = await user.find({ uname: { $regex: `${usrname}` } });
            console.log(usrs)
            res.status(200).json(usrs)

        }else{
            throw Error("Field Empty")
        }

    }catch(err){
        console.log(err)
        res.status(400).json({"Error": errs.errHand(err)})
    }

}