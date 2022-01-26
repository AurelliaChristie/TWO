// Import modules
const express = require("express");
const router = express.Router();

const Conversation = require("../models/Conversation");

// New Conversation
router.post("/", async(req, res) => {
    if(req.body.name !== null){
        const newConversation = new Conversation({
            name: req.body.name,
            members: [req.body.senderId]
        });
        try{
            const savedConversation = await newConversation.save();
            res.status(200).json(savedConversation);
        } catch (error){
            res.status(500).json(error);
        }
    } else {
        const newConversation = new Conversation({
            name: req.body.name,
            members: [req.body.senderId, req.body.receiverId]
        });
        try{
            const savedConversation = await newConversation.save();
            res.status(200).json(savedConversation);
        } catch (error){
            res.status(500).json(error);
        }
    }    
});

// Get Conversation of 2 people
router.get("/:userId/:friendId", async (req, res) => {
    try{
        const conversation = await Conversation.findOne({
            $and: [
                {name: ""},
                {members: { $all: [req.params.userId, req.params.friendId]}}
            ]
        });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    } 
})

// Get Channel 
router.get("/:channelName", async (req, res) => {
    try{
        const conversation = await Conversation.findOne({
            name: req.params.channelName
        });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    } 
})

// Join Channel
router.put("/:channelName/:userId", async (req, res) => {
    try{
        const conversation = await Conversation.findOneAndUpdate(
            {name: req.params.channelName},
            {$push: {members: req.params.userId}},
            {new: true}
        );
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Leave Channel
router.put("/:channelName/:userId", async (req, res) => {
    try{
        const conversation = await Conversation.findOneAndUpdate(
            {name: req.params.channelName},
            {$pull: {members: req.params.userId}},
            {new: true}
        );
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Leave Channel
router.put("/:channelName/:userId", async (req, res) => {
    try{
        const conversation = await Conversation.findOneAndUpdate(
            {name: req.params.channelName},
            {$pull: {members: req.params.userId}},
            {new: true}
        );
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Delete Conversation
router.delete("/:conversationId", async (req, res) => {
    try{
        const conversation = await Conversation.findByIdAndDelete(req.params.conversationId);
        res.status(200).json("Conversation has been deleted.");
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;