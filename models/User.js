const mongoose = require("mongoose");
const jwt=require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: false,
    },
    tokens: [{
        token: {
            type: String
        }
    }],
    bookings:[
        {
            start: {
                type: String
            },
            destination:{
                type: String
            },
            busName:{
                type:String
            }
        }
    ]
});

UserSchema.methods.generateAuthToken=async function() {
    const user=this
    const token=jwt.sign({_id: user._id.toString()}, "FSADASSIGNMENTBUSTICKETBOOKING")
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}

UserSchema.pre('save', async function (next) {
    const user=this
    if (user.isModified('password')) {
        user.password=await bcrypt.hash(user.password,8)
    }
    next();
})

UserSchema.statics.findByCredentials=async (email, password)=>{
    const user=await User.findOne({email})
    if (!user) {
        throw new Error('UserNotExist')
    }
    const isMatch=await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('PasswordNotMatch')
    }
    return user
}

const User = mongoose.model("user", UserSchema);

module.exports = User;