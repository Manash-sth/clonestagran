const post = require('../model/post_model')
const jwtdec = require('jwt-decode')
const errs = require('../services/errorHandling')

exports.Comment = async(req, res) =>{
    const cmt = req.body.cmt
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
            await pst.updateOne({ $push: { comment: {id, cmt} } });

            res.status(200).json({"Done": "Done"})
        }else{
            throw Error("Please refresh and try again")
        }


    }catch(err){
        res.status(400).json({"Error": errs.errHand(err)})
    }

}