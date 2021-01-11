const mongoose =  require("mongoose");
const name = require("./name");

const tempAccountSchema = new mongoose.Schema({
    usename:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    emailAddress: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    emailConfirmation: {
        Code: {
            type: String,
            required: true
        },
        confirmed:{
            type: Boolean,
            default: false
        }

    },
    phoneConfirmation: {
        Code: {
            type: String
        },
        confirmed:{
            type:Boolean,
            default: false
        }
    }
})

module.exports = mongoose.model("TempAccount", tempAccountSchema);
