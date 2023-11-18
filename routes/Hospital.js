const Hospital = require('../models/Hospital')
const express = require('express')
const router = express.Router();

// Get all hospitals
router.get('/', async (req, res) => {
    const hospitals = await Hospital.find();

    if(!hospitals) {
        res.status(404).json({error: 'Not Found'});
    }

    res.status(200)
        .json({
            success: true,
            hospitals
        }
    );
})

//Get one hospital
router.get('/:hospital_id', async (req, res) => {
    const hospital = await Hospital.findById(req.params.hospital_id);

    if(!hospital) {
        res.status(404).json({error: 'Not Found'});
    }

    res.status(200)
        .json({
            success: true,
            hospital
        }
    );
})

module.exports = router;
