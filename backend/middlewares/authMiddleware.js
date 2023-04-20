const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt
    console.log(token)
    
    if(token){
        try {
            const userPayLoad =  jwt.verify(token, process.env.SECREAT_KEY)
            next()
        } catch (error) {
        res.status(400).send({status:'error', msg:'Token is invalid'})
            
        }
       
    } else {
        res.status(400).send({status:'error', msg:'Token not found'})
    }

}

module.exports = {
    verifyToken
}