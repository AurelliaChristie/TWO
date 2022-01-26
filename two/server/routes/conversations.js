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
router.get("/dm/:userId/:friendId", async (req, res) => {
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

// Get All Channel
router.get("/channels", async (req, res) => {
    try{
        const conversation = await Conversation.find({
            name:   {"$exists" : true, "$ne" : ""}
        });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Get Channel 
router.get("/channels/:channelId", async (req, res) => {
    try{
        const conversation = await Conversation.findById(req.params.channelId);
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    } 
})

// Join Channel
router.put("/channels/:channelId/:userId", async (req, res) => {
    try{
        const conversation = await Conversation.findOneAndUpdate(
            {_id: req.params.channelId},
            {$push: {members: req.params.userId}},
            {new: true}
        );
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Leave Channel
router.put("/channels/:channelId/:userId", async (req, res) => {
    try{
        const conversation = await Conversation.findOneAndUpdate(
            {_id: req.params.channelId},
            {$pull: {members: req.params.userId}},
            {new: true}
        );
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Leave Channel
router.put("/channels/:channelId/:userId", async (req, res) => {
    try{
        const conversation = await Conversation.findOneAndUpdate(
            {_id: req.params.channelId},
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