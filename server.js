const express = require('express')
const app = express();
const cookieParser = require('cookie-parser');

const {verifyAuthToken} = require('./middleware/verifyToken.js')
// body-parser
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// public routes
// auth routes
app.use('/api/auth/login',require('./routes/auth/login.js'));
app.use('/api/auth/signup',require('./routes/auth/signup.js'));
app.use('/api/auth/redirect',require('./routes/auth/callbacks.js'));

app.get('/',(req,res)=>{
  res.send("API Working");
})
// ===============================================
// protected routes
// check token middleware for protected routes'
app.use(verifyAuthToken)
// post's routes
app.use('/post',require('./routes/post/post.js'));
app.listen(3001,()=>{
  console.log(`Welcome to --port: 3001`);
})
