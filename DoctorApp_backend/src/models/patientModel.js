const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

const patientSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    firsttimevisit: {
        type: Boolean,
        required: true
    },
    issue: {
        type: String,
        required: true
    }
});

patientSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

patientSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

mongoose.model('Patient', patientSchema);

module.exports = patientSchema;