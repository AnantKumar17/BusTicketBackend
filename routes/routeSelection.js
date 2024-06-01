var express = require('express');
var router = express.Router();
var Bus = require('../models/Bus');
var User = require('../models/User')
const userAuth = require('../middleware/userauth');
const jwt=require('jsonwebtoken')


router.post('/', userAuth,(req, res) => {
    Bus.find({ 'startCity': req.body.startCity, 'destination': req.body.destination ,'availableSeats': {$gt:0}}).exec((err, bus) => {
        if (err) {
            res.json({ status: false, message: "error while searching" })
        }
        else res.json({ bus })
    })
})

router.post('/booked', userAuth,(req, res) => {
   const busid =req.body.busid
   Bus.find({_id:busid}).exec(async(err,bus)=>{
    const token=req.header('Authorization').replace('Bearer ', '')
    const decoded=jwt.verify(token, "FSADASSIGNMENTBUSTICKETBOOKING")
    const user=await User.findOne({_id: decoded._id, 'tokens.token': token})
    user.bookings.push({"start":bus[0].startCity,"destination":bus[0].destination,"busName":bus[0].busName})
    user.save()
    bus[0].availableSeats = bus[0].availableSeats-1;
    const b = new Bus(bus);
    b.save()
    res.status(200).send({
        status: {
            code: 200,
            message: 'Bus Booked'
        },
        data: {
            bus: bus,
        }
    })
   })
})

module.exports = router;
