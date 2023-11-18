const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    name: String,
    hospital_id: String,
    patient_id: Number,
    age: Number,
    marital_status: String,
    latest_diagnosis: String,
    sex: String,
    height: String,
    weight: String
}, {timestamps: true})

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient;
