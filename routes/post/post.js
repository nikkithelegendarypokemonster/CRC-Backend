const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
  res.json([
    {
      content: "Hello World",
      user: "Nikki"
    },
    {
      content: "My Post",
      user: "Admin"
    },
])
});

module.exports = router
