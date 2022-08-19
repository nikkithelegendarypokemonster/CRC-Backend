const express = require('express');
const router = express.Router();

// basic login just check if exist or not then return status code
//
router.post('/',(req,res)=>{
  for(user in users){
    if(req.body.email === users[user].email && req.body.pass === users[user].pass){
      res.status(200).json({msg:"User Found",data:users[user]});
      break
    }
  }
  res.status(400).json({error:"No User"})
})
module.exports = router
