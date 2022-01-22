// Import modules
const mongoose = require("mongoose");

// Create schema
const UserSchema = new mongoose.Schema({
        username:{
            type: String,
            required: true,
            min: 5,
            max: 20,
            unique: true
        },
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true,
            min: 6
        },
        profilePicture:{
            type: String,
            default: ""
        },
        coverPicture:{
            type: String,
            default: ""
        },
        nation:{
            type: String,
            default: ""
        },
        interest:{
            type: String,
            default:""
        },
        division:{
            type: String,
            default: ""
        },
        isAdmin:{
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);