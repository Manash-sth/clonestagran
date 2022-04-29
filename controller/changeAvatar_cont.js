const path = require('path')
const fs = require('fs')
const dec = require('jwt-decode')
const errs = require('../services/errorHandling')
const imageToBase64 = require('image-to-base64');

var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'ddqyll9ug',
    api_key: '699361163992254',
    api_secret: 'lVzxPfc_pk-45yNk-YUIeNxLSYc'
});

const user = require('../model/user_model')

const img_path = process.env.IMG_PATH

exports.Avatar = async(req, res) => {
    try{
        const token = req.get('Authorization')
        const decod = dec(token)
        const tempPath = req.file.path;
        const nn = Date.now().toString()

        //const base64str = base64_encode(tempPath);

        await cloudinary.v2.uploader.upload(tempPath, 
            async function(error, result) {
                const usr = await user.findById(decod.id)
                const usrupd = await usr.updateOne({avatar: result.url})
                console.log(result.url)
            });

        res.status(200).json({"Avatar": "Avatar changed"})
    }catch(err){
        console.log(err)
        res.status(400).json({"Error": errs.errHand(err)})
    }       
}

function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer.from(bitmap).toString('base64');
}
