const jwt = require('jsonwebtoken');
const JWT_SECRET = 'yash$';
var fetchuser = (req, res, next) =>{
const token = req.header('auth-token');
if(!token){
    res.status(401).send({error: "Invalid auth-token"})
}
try{
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data;
    // console.log(req.user)
    next();
}
catch(error){
    res.status(401).send({error: "Please enter a valid token"})
}
}
module.exports = fetchuser;
