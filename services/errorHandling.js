exports.errHand = (err) =>{
    const erro = String(err)
    const er = erro.split('\n')[0].split(':')[1].trim()
    console.log(erro)

    if(er.startsWith("E11000 duplicate key error collection")){
        return("User with that email or id already exists")
    }
    else if(er.startsWith("uname")){
        return("Username too long")
    }
    else if(er.startsWith("Cast to ObjectId")){
        return("Develover error. Invalid userID")
    }
    else if(er.startsWith("Cannot read property 'deleteOne' of null")){
        return("No user found")
    }
    else if(er.startsWith("Cannot read property 'role' of null")){
        return("No such user")
    }
    else{
        return er
    }
}