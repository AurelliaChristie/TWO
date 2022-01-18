// Import modules
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// Import models
const User = require("../models/User");

// Add routes
router.get("/:username", async(req, res) => {
    try{
        const user = await User.findOne({
            username: req.params.username
        });
        const {password, updatedAt, __v, ...other} = user._doc;
        res.status(200).json({
            message: "Successfully get user profile.",
            data: other
        });
    } catch (error){
        res.status(500).json(error);
    }
});

router.put("/:userId", async(req, res) => {
    if(req.body.userId === req.params.userId){
        try{
            const user = await User.findByIdAndUpdate(req.params.userId, {
                $set: req.body
            });
            res.status(200).json("Account has been updated.");
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).send("You can only update your account!");
    }
});

router.put("/:userId/password", async(req, res) => {
    if(req.body.userId === req.params.userId){
        if(req.body.password === req.body.confirmPassword){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                return res.status(500).json(error);
            } 
            try{
                const user = await User.findByIdAndUpdate(req.params.userId, {
                    password: req.body.password
                });
                res.status(200).json("Password has been updated.");
            } catch (error) {
                return res.status(500).json(error);
            }
        } else {
            return res.status(400).send("Password and password confirmation contain different values.");
        }
    } else {
        return res.status(403).send("You can only update your password!");
    }
});

router.delete("/:userId", async(req, res) => {
    if(req.body.userId === req.params.userId || req.body.isAdmin){
        try{
            const user = await User.findByIdAndDelete(req.params.userId);
            res.status(200).json("Account has been deleted.");
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).send("You can only delete your account!");
    }
});

router.put("/:userId/follow", async(req, res) => {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.userId);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.filter(follower => follower.userId === req.body.userId).length === 0){
                await user.updateOne({
                    $push: {followers: {
                        userId: req.body.userId,
                        name: currentUser.name,
                        profilePicture: currentUser.profilePicture
                    }}
                });
                await currentUser.updateOne({
                    $push: {followings: {
                        userId: req.params.userId,
                        name: user.name,
                        profilePicture: user.profilePicture
                    }}
                });
                res.status(200).json({
                    message: "Successfully followed the user.",
                    data: {
                        userId: req.params.userId,
                        name: user.name,
                        profilePicture: user.profilePicture
                    }
                });
            } else {
                res.status(403).json("You already followed the user.");
            }
        } catch (error){
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You can't follow yourself!");
    }
});

router.put("/:userId/unfollow", async(req, res) => {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.userId);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.filter(follower => follower.userId === req.body.userId).length > 0){
                await user.updateOne({
                    $pull: {followers: {
                        userId: req.body.userId,
                        name: currentUser.name,
                        profilePicture: currentUser.profilePicture
                    }}
                });
                await currentUser.updateOne({
                    $pull: {followings: {
                        userId: req.params.userId,
                        name: user.name,
                        profilePicture: user.profilePicture
                    }}
                });
                res.status(200).json({
                    message: "Successfully unfollowed the user.",
                    data: {
                        userId: req.params.userId,
                        name: user.name,
                        profilePicture: user.profilePicture
                    }
                });
            } else {
                res.status(403).json("You haven't followed the user.");
            }
        } catch (error){
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You can't follow yourself!");
    }
});

router.get("/:userId/follow", async (req, res) => {
    try{
        const user = await User.findById(req.params.userId);
        res.status(200).json({
            message: "Successfully get the user's friends.",
            data: user.followings
        });
    } catch (error){
        res.status(500).json(error);
    }
});

// Export module
module.exports = router;