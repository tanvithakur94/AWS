const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
{
    doctorId: {
        type: String,
        required: true,
    },
    patientId: {
        type: String,
        required: true,
    },
    patientName: {
        type: String,
        required: true,
    },
    bookTime: {
        type: String,
        required: true
    },
});

mongoose.model('Appointment', appointmentSchema);

module.exports = appointmentSchema;