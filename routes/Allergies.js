const Patient = require('../models/Patient')
const Allergy = require('../models/Allergies')
const express = require('express')
const router = express.Router();
const verifyJWT = require('../helpers/verifyJWT')

router.use(verifyJWT())

//Add Medication
router.post('/:hospital_id/patients/:patient_id/allergies', async (req, res) => {
    const patient = await Patient.findById(req.params.patient_id);

    const { allergy_name, severity, reaction } = req.body

    try {
        const allergyObj = new Allergy({
            patient_id: patient.id,
            allergy_name,
            severity,
            reaction
        })
        const allergy = await allergyObj.save()

        return res.status(201).json({
            success: true,
            message: "Allergies saved successfully",
            allergy
        })
    }catch(e) {
        console.log(e)
        return res.status(500).json({success: false, error:e})
    }
})

// Get Medication
router.get('/:hospital_id/patients/:patient_id/allergies', async (req, res) => {
    const patient = await Patient.findById(req.params.patient_id);
    if(!patient) res.status(404).json({error: 'Not Found'});

    const allergies = await Allergy.find({ patient_id: patient.id})

    res.status(200)
        .json({
            success: true,
            allergies
        }
    );
})

router.put('/:hospital_id/patients/:patient_id/allergies/allergy_id', async (req, res) => {
    const allergy = await Allergy.findByIdAndUpdate(req.params.allergy_id, req.body, {
        new: true,
    });
    if (!allergy) return res.status(404).json({ message: "patient not found" });
    res.json({
        success: true,
        message: "allergy updated successfully",
        code: 200,
        allergy,
    });
})

module.exports = router
