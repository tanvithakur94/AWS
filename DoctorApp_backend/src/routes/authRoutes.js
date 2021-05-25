const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const doctorSchema = require("../models/doctorModel");
const patientSchema = require('../models/patientModel');
const Doctor = mongoose.model('Doctor', doctorSchema);
const Patient = mongoose.model('Patient', patientSchema);
const jwt = require('jsonwebtoken');
const { getSecret } = require('../shared/utils');
var bcrypt = require('bcrypt-nodejs');

generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

router.post('/doctorsignup', async (req, res) => {
    try {
        const { name, qualification, email, password, age, speciality, experienceinyears, previousexperience} = req.body;
        Doctor.findOne({'email': email}, function(err, doctor){
            if(err)
                return res.status(500).json({error: err});
            if(doctor)
                return res.status(403).json({error: 'Doctor is alreay existed'});
            else {
                const token = getSecret();
                let doctor = new Doctor();
                doctor.password = doctor.generateHash(password);
                doctor.name = name;
                doctor.qualification = qualification;
                doctor.email = email;
                doctor.age = age;
                doctor.speciality = speciality;
                doctor.experienceinyears = experienceinyears;
                doctor.previousexperience = previousexperience;

                doctor.save(function(err){
                    if(err) throw err;
                    const userToken = jwt.sign({userId: doctor._id}, token);
                    return res.status(201).json({userToken, doctor});
                })
            }
        })
    }catch {
        res.status(500).json({error: "There is some errors"})
    }
});

router.post('/doctorlogin', async(req, res) => {
    try {
        const token = getSecret();
        const {email, password} = req.body;
        Doctor.findOne({'email': email}, function(err, doctor) {
            if(err)
                return res.status(500).json({error: 'There is some error in the database'});
            if(!doctor)
                return res.status(403).json({error: 'User is not existed.'});
            if(!doctor.validPassword(password))
                res.status(403).json({error: 'Invalid Password'});
            else {
                const userToken = jwt.sign({userId: doctor._id}, token);
                doctor = {...doctor._doc, userToken};
                res.status(201).json({doctor});
            }
        })
    }catch {
        res.status(500).json({error: "There is some errors"})
    }
});


router.post('/patientsignup', async (req, res) => {
    try {
        console.log("this is the user");
        console.log(req.body);
        const { name, phone, email, password, gender, age, birthday, address, pincode, firsttimevisit, issue} = req.body;
        Patient.findOne({'email': email}, function(err, patient){
            if(err)
                return res.status(500).json({error: err});
            if(patient)
                return res.status(403).json({error: 'Patient is alreay existed'});
            else {
                const token = getSecret();
                let patient = new Patient();
                patient.password = patient.generateHash(password);
                patient.name = name;
                patient.phone = phone;
                patient.email = email;
                patient.age = age;
                patient.gender = gender;
                patient.birthday = birthday;
                patient.address = address;
                patient.pincode = pincode;
                patient.firsttimevisit = firsttimevisit;
                patient.issue = issue;
                patient.save(function(err){
                    if(err) throw err;
                    const userToken = jwt.sign({userId: patient._id}, token);
                    return res.status(201).json({userToken, patient});
                })
            }
        })
    }catch {
        res.status(500).json({error: "There is some errors"})
    }
});

router.post('/patientlogin', async(req, res) => {
    try {
        const token = getSecret();
        const {email, password} = req.body;
        let filter = [{'email': email}];
        if(email.length == 24)
            filter.push({'_id': email});
        Patient.findOne({
            $or: filter
        }, function(err, patient) {
            if(err){
                console.log('err', err);
                return res.status(500).json({error: 'There is some error in the database'});
            }
            if(!patient)
                return res.status(403).json({error: 'Patient is not existed.'});
            if(!patient.validPassword(password))
                res.status(403).json({error: 'Invalid Password'});
            else {
                const userToken = jwt.sign({userId: patient._id}, token);
                patient = {...patient._doc, userToken};
                res.status(201).json({patient});
            }
        })
    }catch {
        res.status(500).json({error: "There is some errors"})
    }
});

router.post('/updatepatientprofile', async (req, res) => {
    try {
        const { _id, name, phone, email, password, gender, age, birthday, address, pincode, issue} = req.body;
        let patient = {};
        patient.password = generateHash(password);
        patient.name = name;
        patient.phone = phone;
        patient.email = email;
        patient.age = age;
        patient.gender = gender;
        patient.birthday = birthday;
        patient.address = address;
        patient.pincode = pincode;
        patient.issue = issue;
        Patient.findOneAndUpdate({_id: _id}, patient , {new: true}, function(err, doc) {
            if (err) return res.send(500, {error: err});
            return res.status(201).json({doc});
        });
    }catch {
        res.status(500).json({error: "There is some errors"})
    }
});

router.post('/updatedoctorprofile', async (req, res) => {
    try {
        const { _id, name, qualification, email, password, age, speciality, experienceinyears, previousexperience} = req.body;
        let doctor = {};
        doctor.password = generateHash(password);
        doctor.name = name;
        doctor.qualification = qualification;
        doctor.email = email;
        doctor.age = age;
        doctor.speciality = speciality;
        doctor.experienceinyears = experienceinyears;
        doctor.previousexperience = previousexperience;
        Doctor.findOneAndUpdate({_id: _id}, doctor , {new: true}, function(err, doc) {
            if (err) return res.send(500, {error: err});
            return res.status(201).json({doc});
        });
    }catch {
        res.status(500).json({error: "There is some errors"})
    }
});

module.exports = router;