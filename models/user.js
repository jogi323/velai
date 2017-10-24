var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var userSchema = new Schema({
    Firstname : String,
    Lastname : String,
    Email_Address: {type: String, required: true},
    Password: {type: String, required: true},
    Address_street : String,
    Address_Unit: String,
    City : String,
    State : String,
    Zip_Code: Number,
    Phone1:Number,
    Phone2:Number,
    Position:String,
    Experience:Number,
    Hourly_Pay:Number,
    Practice_Name: String,
    image:String,
    Speciality: String,
    Practice_Phone: Number,
    Nr_of_Operations: Number,
    Nr_of_Staff: Number,
    Travel_Distance:Number,
    Languages: String,
    Dental_School: String,
    Year_Graduated: Number,
    License_Nr: String,
    Years_in_Practice: Number,
    Contact_Person: String,
    Contact_Phone_Nr: Number,
    Referred_By: String,
    Date_Submitted: String
});

userSchema.plugin(mongooseUniqueValidator);

var User = mongoose.model('User', userSchema);