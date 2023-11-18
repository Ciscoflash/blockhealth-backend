const mongoose = require('mongoose');

const allergySchema = new mongoose.Schema({
    id: String,
    patient_id: String,
    allergy_name: String,
    severity: String,
    reaction: String,
})

const Allergy = mongoose.model('Allergy', allergySchema)

module.exports = Allergy
