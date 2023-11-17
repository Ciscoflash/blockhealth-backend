const User = require('../models/User')
const express = require('express')
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken")
const { hashPassword, comparePassword } = require("../helpers/hashPassword")
const bcrypt = require("bcrypt");

function generateToken(name) {
    return jwt.sign({ name: name }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
}

//Create User
router.post('/signup', async (req, res) => {
    const { name, email, password, city } = req.body

    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        city: Joi.string().required(),
        password: Joi.string()
            .min(6)
            .required()
            .regex(/^(?=.*[!@#$%^&*])/, "at least one special character")
            .messages({
                "string.pattern.base": "Password must contain at least one special character",
            }),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        const errorMessage = `Bad Request ${error.details[0].message}`;
        return res.status(400).json({ error: errorMessage });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res
            .status(409)
            .json({ error: "Invalid email account, Email already exists" });
    }

    const newUser = new User({
        name,
        email,
        city,
        password: await hashPassword(password)
    });

    try {
        console.log(newUser);
        const user = await newUser.save();

        // Generate JWT token
        const token = generateToken(name);

        return res.status(201).json({
            message: "User created successfully",
            success: true,
            token,
            user
        });
    } catch (error) {
        console.error(error); // Log the saveError object for debugging
        return res
            .status(500)
            .json({ error: "Failed to save user to the database" });
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if(!user) {
            return res.json({error: "user not found", code: 404, success: false});
        } else{
            const match = comparePassword(password, user.password);
            if(match) {
                // create jwt
                const accessToken = jwt.sign(
                    {
                        "UserInfo":{
                            "email":user.email
                        }
                    }, process.env.SECRET_TOKEN, {expiresIn: '60s'}
                )
                const refreshToken = jwt.sign(
                    {
                        "email":user.email
                    }, process.env.REFRESH_TOKEN, {expiresIn: '1d'}
                )

                // saving refresh token with current user
                user.refresh_token = refreshToken;
                await user.save();

                // create a secure cookie with refresh token
                res.cookie("jwt", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "None",
                    maxAge: 24 * 60 * 60 * 1000,
                });
                return res.json({
                    code: 200,
                    message: "logged in successfully",
                    user: {
                        email: user.email,
                        username: user.username,
                        accessToken,
                    },
                });
            } else {
                res.sendStatus(401);
            }
        }
    } catch (error) {
        console.error(error);
    }
})

module.exports = router
