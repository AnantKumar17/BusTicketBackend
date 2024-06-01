var express = require('express');
var router = express.Router();
var User = require('../models/User')
var moment = require('moment');
var bodyParser = require('body-parser')



var jsonParser = bodyParser.json()

router.post('/', jsonParser, async (req, res) => {
    const user = new User(req.body);
    var token=''
    try {
        await user.save()
        token=await user.generateAuthToken();
        return res.status(201).send({
            status: {
                code: 201,
                message: 'User created!!!'
            },
            data: {
                user,
                token
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            status: {
                code: 400,
                message: 'Bad Request, probably format of input doesn\'t matches with prescribed format'
            },
            data: {}
        })
    }
});

module.exports = router;
