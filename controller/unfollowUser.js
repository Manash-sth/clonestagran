const user = require('../model/user_model')
const jwtdec = require('jwt-decode')
const errs = require('../services/errorHandling')

exports.UnfollowUser = async(req, res) =>{
    const usrid = req.params.id
    const token = req.get("Authorization")
    console.log(token)

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

            if (usr.follower.includes(id)) {
                await usr.updateOne({ $pull: { follower: id } });
                await cusr.updateOne({ $pull: { following: usrid } });
                res.status(200).json({"Unfollow":"User unfollowed"});
              } else {
                  throw Error("You dont follow this user")
              }

        }else{
            throw Error("Field Empty")
        }

    }catch(err){
        console.log(err)
        res.status(400).json({"Error": errs.errHand(err)})
    }

}