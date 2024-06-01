const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BusSchema = mongoose.Schema({
    companyName: {
        type: String
    },
    busType: {
        type: String
    },
    busNumber: {
        type: String
    },
    startCity: {
        type: String
    },
    destination: {
        type: String
    },
    totalSeats: {
        type: String
    },
    availableSeats: {
        type: String
    },
    pricePerSeat: {
        type: String
    }
})

const Bus = mongoose.model('bus', BusSchema)

module.exports = Bus;