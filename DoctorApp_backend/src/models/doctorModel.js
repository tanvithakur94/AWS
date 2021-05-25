const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

const doctorSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    experienceinyears: {
        type: Number,
        required: true
    },
    previousexperience: {
        type: String,
        required: true
    }
});

doctorSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

doctorSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

mongoose.model('Doctor', doctorSchema);

module.exports = doctorSchema;