const user = require('../model/user_model')
const post = require('../model/post_model')
const errs = require('../services/errorHandling')
const jwtdec = require('jwt-decode')

  exports.Newsfeed = async(req, res) =>{
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

        const usr = await user.findById(id);
        const usrr = await user.find();

        // var v = []

        // const pst = await Promise.all(
        //   usr.following.map(async (fol) => {
        //     const a = await post.find({ user: fol });
        //     for(var i=0; i<a.length; i++){
        //       v.push(a[i])
        //     }
        //     return a
        //   })
        // );

        // var ur

        // if(pst.length>0){
        //   ur = await Promise.all(
        //   v.map(async (usrr) => {
        //     const a = await user.findById(usrr.user);
        //     return a
        //   })
        // )}
        
        res.status(200).json(usrr)

    }catch(err){
        res.status(400).json({"Error": errs.errHand(err)})
    }
  }