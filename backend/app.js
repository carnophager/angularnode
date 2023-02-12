const express = require('express');
const path = require('path');
const cors  = require('cors');
const bodyparser = require('body-parser');

const mongoose = require('mongoose');
const uri = 'mongodb+srv://carnophage:simplepass@cluster0.kjibycu.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri, {useNewUrlParser: true}).then(() => {
  console.log('MongoDB connected with Mongoose!')
}).catch(err => console.log(err));

const app = express();
app.use(cors());
app.use(bodyparser.json());
const userRoutes = require('./user');
const adminRoutes = require('./admin');
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;
