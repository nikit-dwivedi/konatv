const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    fullName: { type: String,},
    email: { type: String, unique: true },
    username: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    password: { type: String, required: true },
    profileImage: { type: String },
    gender: { type: String },
    country: { type: String },
    town: { type: String },
    dob: { type: String },
    isRegisterd: { type: Boolean, default: false },
    isLogin: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true }
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel