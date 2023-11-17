const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    name: String,
    user_id: Number,
    age: Number,
    maritalStatus: String,
    Sex: String,
    Height: String,
    Weight: String,
    updatedAt: Date.now()
})

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient;
