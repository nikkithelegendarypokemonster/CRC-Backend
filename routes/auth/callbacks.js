const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');

// Key's
const privateKey = "$hgbiyugvuyfed%Jd23652$5dcymlcdms)))vfnbkij43y75";
// process the login callback url
// 1. verify jwt token
// 2. set authorization header bearer
// 3. redirect to protected pages
router.get('/',(req,res)=>{
  try {
    var decoded = jwt.verify(req.query.token, privateKey);
    // set headers
    // format: Bearer <Token>
    // res.header('Authorization',"Bearer "+req.query.token);
    res.cookie('Authorization', "Bearer "+req.query.token)
    res.redirect('/post');
  } catch (err) {
    res.status(403).send({msg:"Unauthorize Access"})
  }

})

module.exports=router;
