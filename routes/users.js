var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var VerifyToken = mongoose.model('VerifyToken');
var crypto = require('crypto');

//var User = require('../models/User');
var auth = require('./auth');

var nodemailer = require("nodemailer");

/* GET users listing. */
router.get('/auth', auth.required, function(req, res, next) {
    User.findById(req.payload.id, function(err,user){
        if (err) {
            console.log(err);
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }    
        if (!user) {
            return res.status(401).json({
                title: 'Not Authorised',
                error: {message: 'Login Again'}
            });
        }else{
            var token = user.generateJWT();
            var user = user.toAuthJSON();
            res.status(200).json({
                token: token,
                user: user
            });
        }
    })
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
    if (!user.validPassword(req.body.Password)) {
        return res.status(401).json({
            title: 'Login failed',
            error: {message: 'Invalid login credentials'}
        });
    }
    if(!user.Email_Verified){
        var token = new VerifyToken();
        token.user = user._id;
        token.token = crypto.randomBytes(16).toString('hex')
        token.save(function (err) {
            if (err) { 
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                  user: 'ashokona@gmail.com',
                  pass: 'F!ghtClub'
                }
              });

              var mailOptions = {
                from: "ashokona@gmail.com",
                to: user.Email_Address,
                subject: "Account Verification Token",
                generateTextFromHTML: true,
                html: '<p>hi</P>'
              };
              
             var mailOptions = { from: 'ashokona@gmail.com', to: user.Email_Address, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/user'+'\/confirmation\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { 
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(200).json({
                    message: 'Verify email to login '+ user.Email_Address + '.',
                });
            });
        });
    }
    else{
        var token = user.generateJWT();
        var user = user.toAuthJSON();
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            user: user
        });
    }

  });
});

router.post('/save', function(req, res, next) {
    
  var user = new User();

    user.Firstname = req.body.Firstname;
    user.LastName = req.body.LastName;
    user.Referred_By = req.body.Referred_By;
    user.setPassword(req.body.Password);
    user.Email_Address = req.body.Email_Address;
    user.Date_Submitted = req.body.Date_Submitted;

  user.save(function(err, result) {
      if (err) {
          console.log(err)
          return res.status(500).json({
              title: 'An error occurred',
              error: err
          });
      }
      else{
        var token = new VerifyToken();
        token.user = result._id;
        token.token = crypto.randomBytes(16).toString('hex')
        token.save(function (err) {
            if (err) { 
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                  user: 'ashokona@gmail.com',
                  pass: 'F!ghtClub'
                }
              });

              var mailOptions = {
                from: "ashokona@gmail.com",
                to: result.Email_Address,
                subject: "Account Verification Token",
                generateTextFromHTML: true,
                html: '<p>hi</P>'
              };
              
             var mailOptions = { from: 'ashokona@gmail.com', to: result.Email_Address, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/user'+'\/confirmation\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { 
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(200).json({
                    message: 'A verification email has been sent to'+ result.Email_Address + '.',
                });
            });
        });
      }
  });
});

router.get('/confirmation/:id', function(req, res, next) {
    // Find a matching token
    VerifyToken.findOne({ token: req.params.id }, function (err, token) {
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
 
        // If we found a token, find a matching user
        User.findOne({ _id: token.user }, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            if (user.Email_Verified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
 
            // Verify and save the user
            user.Email_Verified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send("The account has been verified. Please log in.");
            });
        });
    });
});

router.get('/update', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
