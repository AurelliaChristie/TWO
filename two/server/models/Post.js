// Import modules
const mongoose = require("mongoose");

// Create schema
const PostSchema = new mongoose.Schema({
        userId:{
            type: String,
            required: true
        },
        caption:{
            type: String,
            max: 500
        },
        image:{
            type: String
        },
        likes:{
            type: Array,
            default: []
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);