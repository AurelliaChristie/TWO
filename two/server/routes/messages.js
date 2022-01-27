// Import modules
const express = require("express");
const router = express.Router();
const translate = require('translate-google');
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

router.post("/translate/text", async(req, res) => {
    try{
        const result = await translate(req.body.text, {to: req.body.lang});
        res.status(200).json(result)
    } catch(err){
        console.log(err);
    }
})
module.exports = router;