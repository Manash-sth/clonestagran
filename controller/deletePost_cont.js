const post = require('../model/post_model')
const user = require('../model/user_model')
const jwtdec = require('jwt-decode')
const errs = require('../services/errorHandling')

exports.Delete = async(req, res) =>{
    const postid = req.params.pid
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

        const pst = await post.findById(postid)
        if(pst){
            const usr = await user.findById(pst.user)
            await pst.deleteOne()
            await usr.updateOne({ $pull: { post: String(postid) } });
            
            res.status(200).json({"Deleted": "Post deleted"})
        }else{
            throw Error("Post does not exist")
        }


    }catch(err){
        res.status(400).json({"Error": errs.errHand(err)})
    }

}