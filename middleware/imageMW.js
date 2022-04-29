const multer = require('multer')

const img_path = process.env.IMG_PATH

var upload = multer({dest: img_path})

module.exports = {upload}