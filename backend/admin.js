const express = require('express');
const multer = require('multer');
const router = express.Router();
const Car = require('./models/car');
const User = require('./models/user');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
     cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage
});

router.post('/save-image', upload.single('file'), (req, res) => {
  res.status(201).json({message: 'Image uploaded'});
});

router.post('/create-car', (req,res,next) => {
  const car = new Car({
    brand: req.body.brand,
    model: req.body.model,
    power: req.body.power,
    seats: req.body.seats,
    imgUrl: req.body.imgUrl
  });

  car.save().then(response => {
    res.status(201).json({message: "Car created and stored in MongoDB database"})
  }).catch(e => { console.log("Car not saved. Error message: ", e)})
});

router.get('/users', (req, res, next ) => {
  User.find({}, 'email isAdmin').then(db_users =>
  {
    if (!db_users){
      res.status(404).json({message: "No Users Found"});
    }
    res.status(200).json(db_users);
  }).catch(e => {console.log("User not found", e)});
});

router.delete('/users/:email', (req, res,next) => {
  console.log('delete user req:', req);
  User.deleteOne({email: req.params.email}).then(result => {
    User.find().then(users => {
      res.status(201).json(users);
    }).catch(e => {console.log("User not found", e)});
  }).catch(e => {console.log("Delete user did not succeed", e)});
});

router.patch('/users/:email', (req, res,next) => {
  console.log('make admin user req:', req);
  User.updateOne({email: req.params.email}, {isAdmin: req.body.isAdmin}).then(result => {
    User.find().then(users => {
      res.status(201).json(users);
    }).catch(e => {console.log("User not found", e)});
  }).catch(e => {console.log("Update user did not succeed", e)});
});

module.exports = router;

