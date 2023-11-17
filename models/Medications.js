const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
    id: String,
    drug_name: String,
    drug_class: String
})

const Medication = mongoose.model('Medication', medicationSchema);

module.exports =  Medication;
