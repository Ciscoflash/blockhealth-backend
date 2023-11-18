const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    name: String,
    hospital_id: String,
    patient_id: String,
    age: Number,
    marital_status: String,
    latest_diagnosis: String,
    sex: String,
    height: String,
    weight: String,
    heart_rate: Number,
    pressure: String,
    oxygen: Number,
    respiratory: Number,
    temperature: Number
}, {timestamps: true})

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient;
