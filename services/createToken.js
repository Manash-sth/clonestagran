const jwt = require('jsonwebtoken')

const secret1 = process.env.SECRET1
const secret2 = process.env.SECRET2

exports.genToken = async(id, role, time, out) => {
    const payload = {"id": id, "role": role}
    const token = jwt.sign(payload, secret1+out, {expiresIn: time})
    return token
}

exports.genTok = async(id, time) => {
    const payload = {"id": id}
    const token = jwt.sign(payload, secret2, {expiresIn: time})
    return token
}