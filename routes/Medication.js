const Patient = require('../models/Patient')
const Medication = require('../models/Medications')
const express = require('express')
const router = express.Router();
const verifyJWT = require('../helpers/verifyJWT')

router.use(verifyJWT())

//Add Medication
router.post('/:hospital_id/patients/:patient_id/medications', async (req, res) => {
    const patient = await Patient.findById(req.params.patient_id);

    const { drug_name, drug_class } = req.body

    try {
        const drugObj = new Medication({
            patient_id: patient.id,
            drug_name,
            drug_class
        })
        const drug = await drugObj.save()

        return res.status(201).json({
            success: true,
            message: "Medication saved successfully",
            drug
        })
    }catch(e) {
        console.log(e)
        return res.status(500).json({success: false, error:e})
    }
})

// Get Medication
router.get('/:hospital_id/patients/:patient_id/medications', async (req, res) => {
    const patient = await Patient.findById(req.params.patient_id);
    if(!patient) res.status(404).json({error: 'Not Found'});

    const medications = await Medication.find({ patient_id: patient.id})

    res.status(200)
        .json({
            success: true,
            medications
        }
    );
})

module.exports = router
