var jwt = require('jsonwebtoken');

// Key's
const privateKey = "$hgbiyugvuyfed%Jd23652$5dcymlcdms)))vfnbkij43y75";
function verifyAuthToken(req,res,next)
{
  // console.log(req.cookies);
    try {
      const authHeader = req.cookies.Authorization;
      const accessToken = authHeader.split(' ')[1];
      console.log(req.headers.Authorization);
      var decoded = jwt.verify(accessToken, privateKey);
      next();
    } catch (err) {
      res.status(403).send({msg:"Unauthorize Access"})
    }
}
module.exports = {verifyAuthToken}
