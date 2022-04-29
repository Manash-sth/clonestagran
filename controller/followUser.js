const user = require('../model/user_model')
const jwtdec = require('jwt-decode')
const errs = require('../services/errorHandling')

exports.FollowUSer = async(req, res) =>{
    const usrid = req.params.id
    const token = req.get("Authorization")

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

        if(usrid != "" ){
            const usr = await user.findById(usrid);
            const cusr = await user.findById(id);

            if (!usr.follower.includes(id)) {
                await usr.updateOne({ $push: { follower: id } });
                await cusr.updateOne({ $push: { following: usrid } });
                res.status(200).json({"Follow":"User followed"});
              } else {
                  throw Error("You already follow this user")
              }

        }else{
            throw Error("Field Empty")
        }

    }catch(err){
        console.log(err)
        res.status(400).json({"Error": errs.errHand(err)})
    }

}