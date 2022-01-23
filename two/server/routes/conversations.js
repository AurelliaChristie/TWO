// Import modules
const express = require("express");
const router = express.Router();

const Conversation = require("../models/Conversation");

// New Conversation
router.post("/", async(req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    });

    try{
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (error){
        res.status(500).json(error);
    }
});

// Get Conversation of 2 people
router.get("/:userId/:friendId", async (req, res) => {
    try{
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.userId, req.params.friendId]}
        });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    } 
})


module.exports = router;