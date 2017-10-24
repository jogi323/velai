var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/auth', function(req, res, next) {
  User.findOne({Email_Address: req.body.Email_Address}, function(err, user) {
    if (err) {
        console.log(err);
        return res.status(500).json({
            title: 'An error occurred',
            error: err
        });
    }
    if (!user) {
        return res.status(401).json({
            title: 'Login failed',
            error: {message: 'Invalid login credentials'}
        });
    }
    if (!bcrypt.compareSync(req.body.Password, user.Password)) {
        return res.status(401).json({
            title: 'Login failed',
            error: {message: 'Invalid login credentials'}
        });
    }
    var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
    res.status(200).json({
        message: 'Successfully logged in',
        token: token,
        user: user
    });
  });
});

router.post('/save', function(req, res, next) {
  console.log(req.body)
  var user = new User();

    user.Firstname = req.body.Firstname;
    user.LastName = req.body.LastName;
    user.Referred_By = req.body.Referred_By;
    user.Password = bcrypt.hashSync(req.body.Password, 10);
    user.Email_Address = req.body.Email_Address;

  user.save(function(err, result) {
      if (err) {
          console.log(err)
          return res.status(500).json({
              title: 'An error occurred',
              error: err
          });
      }
      res.status(201).json({
          message: 'User created',
          obj: result
      });
  });
});

router.get('/update', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
