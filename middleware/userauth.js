const jwt=require('jsonwebtoken')
const User=require('../models/User')

const userAuth=async (req, res, next)=>{
    try {
        const token=req.header('Authorization').replace('Bearer ', '')
        const decoded=jwt.verify(token, "FSADASSIGNMENTBUSTICKETBOOKING")
        const user=await User.findOne({_id: decoded._id, 'tokens.token': token})
        if (!user) {
            throw new Error()
        }
        req.token=token
        req.user=user
        next()
    } catch (error) {
        return res.status(401).send({
            status: {
                code: 401,
                message: 'Unauthorized access'
            },
            data: {}
        })
    }
}

module.exports=userAuth