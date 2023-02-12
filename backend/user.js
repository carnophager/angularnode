const express = require('express');
const router = express.Router();

const User = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res, next) => {
  res.status(201).json
 bcrypt.hash(req.body.password, 10).then(hash => {
   const user = new User({
     email: req.body.email,
     password: hash,
     isAdmin: 0
   });
   user.save().then(result=>{
     res.status(200).json({message: 'User created'}).catch(error =>{
       console.log(error);
     });
   })
 })
 // res.status(201).json({message: 'response from nodejs on /signup route'});
});


router.post('/login', (req, res, next) => {
  let fetcheduser;
  User.findOne({email: req.body.email}).then(user => {
    fetcheduser = user;
    if (!user) {
      return res.status(404).json({message: 'No Such User'});
    }
    return bcrypt.compare(req.body.password, user.password)
  }).then(result => {
    if ( !result )
    {
      res.status(404).json({message: 'Incorrect Password'});
    }
    const administrator = fetcheduser.isAdmin;
    const token = jwt.sign({email: fetcheduser.email, userId: fetcheduser._id}, 'secret-long', {expiresIn: '1h'});
    res.status(200).json({token: token, email: fetcheduser.email, expiresIn: 3600, admin: administrator });
  }).catch(err => {
    console.log('Error on backend/user.js::login');
  })
  // res.status(201).json({message: 'response from nodejs on /signup route'});
});

module.exports = router;

