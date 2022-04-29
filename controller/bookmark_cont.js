const user = require('../model/user_model')
const jwtdec = require('jwt-decode')
const errs = require('../services/errorHandling')

exports.Bookmark = async(req, res) =>{
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

        const usr = await user.findById(id)
        await usr.updateOne({ $push: { bookmarks:  postid} })
        res.status(200).json({"Saved": "Bookmark saved"})

    }catch(err){
        res.status(400).json({"Error": errs.errHand(err)})
    }

}