const express = require('express');
const router = express.Router();
let users = require('../../data/users.json');
const crypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const fs = require('fs');


// Key's
const privateKey = "$hgbiyugvuyfed%Jd23652$5dcymlcdms)))vfnbkij43y75";
// classes
class User {
  constructor(email,pass) {
    this.email = email;
    this.password = pass;
  }
}
// user input
// 1. hash & salt password
// 2. store data
// 3. grant access token
// 4. send redirect link with access token
router.post('/',checkIfUserExist,hashAndSalt,putDB,(req,res)=>{
  // generate tokens
  const user = {
    email:res.locals.user.email,
    password:res.locals.user.password
  }
  let token = jwt.sign(user, privateKey);
  let valid = jwt.verify(token,privateKey)
  // send the link to user gmail
  // http://<domain name><:port>?<token>
   var fullUrl = req.protocol + '://' + req.get('host') + "/api/auth/redirect?token="+token;
   // send success msg
   res.status(200).json({msg:"Success",status:valid,callback:fullUrl})
});


// MIDDLEWARES
function checkIfUserExist(req,res,next)
{
  res.locals.found= users.some(user => user.email === req.body.email);
  next();
}
async function hashAndSalt(req,res,next)
{
    const saltRounds = 10;
    let temp = new User(req.body.email,req.body.pass)
    temp.password=await crypt.hash(temp.password, saltRounds)
    res.locals.user = temp;
  next();
}
function putDB(req,res,next)
{
  // if found just update else create
  if(res.locals.found){
    res.status(403).send("User Exist's")
  }else{
    // create user
    users.push(res.locals.user)
    update=JSON.stringify(users, null ,2);
    fs.writeFileSync(__dirname+'/../../data/users.json', update);
  }
  next();
}
module.exports = router
