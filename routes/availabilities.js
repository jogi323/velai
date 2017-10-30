var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Availabilities = mongoose.model('Availabilities');
var User = mongoose.model('User');
var VerifyToken = mongoose.model('VerifyToken');
var crypto = require('crypto');
var auth = require('./auth');

router.post('/save', auth.required, function(req, res, next) {
    User.findById(req.payload.id, function(err,user){
        if (err) { return res.status(500).json({ title: 'An error occurred',error: err }); }    
        if (!user) { return res.status(401).json({ title: 'Not Authorised', error: {message: 'Login Again'} }) }
        else{
            var AvailabilitiesList = req.body;
            var SavedavailabilitiesLength = 0;
            AvailabilitiesList.forEach(function(availabilities) {
                Availabilities.find({'Date':availabilities.Date},function (err, avail){
                    if(err){
                        console.log(err)
                    }
                    if(avail.length != 0){
                        if(typeof availabilities.Time_Start !== 'undefined'){
                            avail[0].Time_Start = availabilities.Time_Start
                        }
                        if(typeof availabilities.Time_Finish !== 'undefined'){
                            avail[0].Time_Finish = availabilities.Time_Finish
                        }
                        if(typeof availabilities.Hours_Guaranteed !== 'undefined'){
                            avail[0].Hours_Guaranteed = availabilities.Hours_Guaranteed
                        }
                        if(typeof availabilities.Date_Submitted !== 'undefined'){
                            avail[0].Date_Submitted = availabilities.Date_Submitted
                        }
                        avail[0].save(function (err, result) {
                            if (err) { return res.status(500).json({ title: 'Work Information Not Updaed',error: err }); }  
                            else{
                                AvailabilitiesList
                            }
                            //res.status(200).json({ message: 'updated sucessfully' });
                        });
                    }
                    else{
                        var availability = new Availabilities();
                            availability.JS_id = user;
                            availability.Date = availabilities.Date;
                            availability.Time_Start = availabilities.Time_Start;
                            availability.Time_Finish = availabilities.Time_Finish;
                            availability.Hours_Guaranteed = availabilities.Hours_Guaranteed;
                            availability.Date_Submitted = availabilities.Date_Submitted;

                        availability.save(function(err, result){
                            if (err) { return res.status(500).json({ title: 'There was problem inserting Data',error: err }); }  
                            else{
                                SavedavailabilitiesLength = SavedavailabilitiesLength + 1;
                            }
                        })
                    }
                })
                console.log(SavedavailabilitiesLength);
            });
            
        }
        // else{
        //     var AvailabilitiesList = req.body;
        //     var AvailabilitiesLength = req.body.length;
        //     req.body.forEach(function(Availability) {
        //         Availability.JS_id = user;
        //     }, this);

        //     Availabilities.create(AvailabilitiesList, function (err, result) {
        //         if (err){
        //             console.log(err)
        //         }
        //         console.log(result)
        //       });
        // }
    })
});

module.exports = router;