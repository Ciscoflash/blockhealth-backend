const User = require('../models/User')
const express = require('express')
const router = express.Router();
// const verifyJWT = require('../helpers/verifyJWT')

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();

    if(!users) {
        res.status(404).json({error: 'Not Found'});
    }

    res.status(200)
        .json({
            success: true,
            users: users
        }
    );
})

//Get one user
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        res.status(404).json({error: 'Not Found'});
    }

    res.status(200)
        .json({
            success: true,
            users: user
        }
    );
})

module.exports = router;
