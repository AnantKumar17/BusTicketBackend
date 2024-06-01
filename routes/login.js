const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/login", async(req, res) => {
    console.log(req.body)
    const email=req.body.email
    const password=req.body.password
    try {
        const user=await User.findByCredentials(email, password)
        const token=await user.generateAuthToken()
        res.status(200).send({
            status: {
                code: 200,
                message: 'User logged-in successfully'
            },
            data: {
                org: user,
                token
            }
        })
    } catch (error) {
        if (error.message === 'UserNotExist') {
            return res.status(404).send({
                status: {
                    code: 404,
                    message: 'User not registered'
                },
                data: {}
            })
        } else if (error.message === 'PasswordNotMatch') {
            return res.status(403).send({
                status: {
                    code: 403,
                    message: 'Password didn\'t matched'
                },
                data: {}
            })
        }
        res.status(400).send({
            status: {
                code: 400,
                message: 'bad request'
            },
            data: {}
        })
    }
});

module.exports = router;