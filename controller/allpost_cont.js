const post = require('../model/post_model')
const errs = require('../services/errorHandling')

exports.Allpost = async(req, res) =>{
    const userid = req.params.id

    try{
        //const usr = await user.findById(id)
        const pst = await post.find({user: userid})
        res.status(200).json(pst)

    }catch(err){
        res.status(400).json({"Error": errs.errHand(err)})
    }

}