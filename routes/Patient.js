const Hospital = require('../models/Hospital')
const Patient = require('../models/Patient')
const express = require('express')
const router = express.Router();
const verifyJWT = require('../helpers/verifyJWT')

router.use(verifyJWT())

// Get all patients
router.get('/:hospital_id/patients', async (req, res) => {
    const hospital = await Hospital.findById(req.params.hospital_id);
    if(!hospital) res.status(404).json({error: 'Not Found'});

    const patients = await Patient.find({hospital_id: hospital.id})
    if(!patients) res.status(404).json({error: 'Not Found'});

    res.status(200)
        .json({
                success: true,
                patients: patients
        }
    );
})

// Get one patient
router.get('/:hospital_id/patients/:patient_id', async (req, res) => {
    const patient = await Patient.findById(req.params.patient_id);
    if(!patient) res.status(404).json({error: 'Not Found'});

    res.status(200)
        .json({
            success: true,
            patient
        }
    );
})

// Create a new patient
router.post('/:hospital_id/patients', async (req, res) => {
    const hospital = await Hospital.findById(req.params.hospital_id);
    if(!hospital) res.status(404).json({error: 'Not Found'});

    const { name, patient_id, age, marital_status, latest_diagnosis, sex, height, weight, heart_rate, pressure, oxygen, respiratory, temperature } = req.body

    try {
        const patientObj = new Patient({
            name,
            hospital_id: hospital._id,
            patient_id,
            age,
            marital_status,
            latest_diagnosis,
            sex,
            height,
            weight,
            heart_rate,
            pressure,
            oxygen,
            respiratory,
            temperature
        })

        const patient = await patientObj.save()

        return res.status(201).json({
            message: "User created successfully",
            success: true,
            patient
        });
    }catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ error: err });
    }
})

router.put('/:hospital_id/patients/:patient_id', async (req, res) => {
    const patient = await Patient.findByIdAndUpdate(req.params.patient_id, req.body, {
        new: true,
    });
    if (!patient) return res.status(404).json({ message: "patient not found" });
    res.json({
        success: true,
        message: "patient updated successfully",
        code: 200,
        patient,
    });
})

router.delete('/:hospital_id/patients/:patient_id', async (req, res) => {
    const patient = await Patient.findByIdAndDelete(req.params.patient_id)

    if (!patient) return res.status(404).json({ message: "patient not found" });
    res.json({
        success: true,
        message: "patient deleted successfully",
        code: 200,
        patient,
    });
})

module.exports = router
