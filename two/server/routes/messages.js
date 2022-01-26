// Import modules
const express = require("express");
const router = express.Router();

const Message = require("../models/Message");

// Get Message of Certain Conversation
router.get("/:conversationId", async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;