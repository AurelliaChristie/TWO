const mongoose = require("mongoose");
const Message = require("./Message");

const ConversationSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        members: {
            type: Array
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);