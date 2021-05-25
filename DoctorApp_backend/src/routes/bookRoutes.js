const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const doctorSchema = require("../models/doctorModel");
const appointmentSchema = require('../models/appointmentModel');
const Doctor = mongoose.model('Doctor', doctorSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);
const jwt = require('jsonwebtoken');
const { getSecret } = require('../shared/utils');
var bcrypt = require('bcrypt-nodejs');

router.get('/doctor-list', async (req, res) => {
    try {
        Doctor.find({}, function(err, doctor){
            
            return res.status(201).json({doctor_list: doctor});
        })
    }catch {
        res.status(500).json({error: "There is some errors"})
    }
});

router.post('/book-appointment', async (req, res) => {
    const {doctorId, patientId, patientName, bookTime} = req.body;
    try {
        Appointment.findOne({'doctorId': doctorId, 'patientId': patientId, 'bookTime': bookTime}, function(err, appointment){
            if(err)
                return res.status(500).json({error: err});
            if(appointment)
                return res.status(403).json({error: 'That time is already booked'});
            else {
                let appointment = new Appointment();
                appointment.doctorId = doctorId;
                appointment.patientId = patientId;
                appointment.patientName = patientName;
                appointment.bookTime = bookTime;
                appointment.save(function(err){
                    if(err) throw err;
                    return res.status(201).json({message:'booked'});
                })
            }
        })
    }catch {
        res.status(500).json({error: "There is some errors"})
    }
});

router.get('/get-appointments', async (req, res) => {
    const {doctorId} = req.query;
    try {
        Appointment.find({'doctorId': doctorId}, function(err, appointments){
            if(err)
                return res.status(500).json({error: err});
            if(appointments)
                return res.status(200).json({appointments});
        })
    }catch {
        res.status(500).json({error: "There is some errors"})
    }
});


module.exports = router;