const mongoose =  require("mongoose");
const name = require("./name");

const userSchema = new mongoose.Schema({
    usename:{
        type: String,
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: true,
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String
    }
})

module.exports = mongoose.model("User", userSchema);
