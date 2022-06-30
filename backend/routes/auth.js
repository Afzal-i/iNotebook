//here we have to use router and for that we need express hence importing express
const express = require('express');
const User = require('../models/User');  //whenever model is required it should be import
const bcrypt = require('bcryptjs');
//importing router 
const router = express.Router();
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'IAMINEVITABLE'
//Route :1 create a user using POST on "/api/authToken"

//whatever written after /api/authToken will be used from below code as we are not ussing anythhing after /api/authToken here we will be passing empty strting i.e '/'
//next path will be a call back function with req-request and res-response 
router.post('/createuser', [
  body('email', 'enter a valid email').isEmail(),
  body('name', 'enter a valid name').isLength({ min: 5 }),
  body('password', 'Enter atleast 5 letter').isLength({ min: 5 })
], async (req, res) => {
  /* console.log(req.body)
   const user= User(req.body)  //whatever data is given in json body in thunder it will be stored in mongo
   user.save()*/
  //If there are errors, return bad error and error message 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //here we will check if the user with the same exists already
  try {
    let user = await User.findOne({ email: req.body.email })
    //console.log(user)
    if (user) {
      return res.status(400).json({ error: "Email id Already exists" })
    }

    //encrypting passworrd using hash and salt
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })
    //data will be needed in auth token fn
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);             //Here Data will be the we will be sending 
    //console.log(authToken)
    res.json({ authToken })
  }
  catch (error) {
    console.error(error.message)
    res.status(500).send("Error 505, something went wrong")
  }
  //   .catch(err=> {console.log(err)
  //     .then(user => res.json(user))
  // res.json({error:'Email id already used, Kindly sign in', message:err.message})
  // })



  /*obj={
      a:'This',
      Number:34
  }
  //sending obj in res-response
  res.json(obj)*/
})
//Route :2  Authenticating a user , no login required"/api/auth/login"
router.post('/login', [
  body('email', 'enter a valid email').isEmail(),
  //body('name', 'enter a valid name').isLength({ min: 5 }),
  body('password', 'Password cannot be Blank').exists()
], async (req, res) => {
  //If there are errors, return bad error and error message 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //taking user data out of the body to check with db and sending error
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: "Login With valid credentials" });
    }
    const passwordcompare = await bcrypt.compare(password, user.password)
    if (!passwordcompare) {
      return res.status(400).json({ errors: "Login With valid credentials" });
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken })
  }
  catch (error) {
    console.error(error.message)
    res.status(500).send("Error 505, something went wrong")
  }
});
  //Route 3: Getting logged in user detail using POST method "/api/auth/getuser". Login is required
  router.post("/getuser",fetchuser, async (req, res)=>{
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Error 505, something went wrong")
  }
})


module.exports = router