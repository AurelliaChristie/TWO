// Import modules
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Import models
const User = require("../models/User");

// Middleware
const authenticateJWT = (req, res, next) => {
    // Take request authorization
    const authHeader = req.headers.authorization;
    if(authHeader){
        // Take token
        const token = authHeader.split(" ")[1];

        // Verify JWT
        jwt.verify(token, process.env.TOKEN, (err, user) => {
            if(err){
                return res.sendStatus(403);
            }

            // If verified
            req.user = user._doc;
            next();
        });
    }else{
        res.sendStatus(401);
    }
}

// Add routes
// Log in authentication
router.get("/", authenticateJWT, async(req, res) => {
    try{
        const user = await User.findOne({
            username: req.user.username
        });
        const {password, createdAt, updatedAt, __v, ...other} = user._doc;
        res.status(200).json({
            message: "Successfully authenticate user.",
            data: other
        });
    } catch (error){
        res.status(500).json(error);
    }
});

// Get Profile
router.get("/:userId", async(req, res) => {
    try{
        const user = await User.findOne({
            _id: req.params.userId
        });
        const {password, createdAt, updatedAt, __v, ...other} = user._doc;
        res.status(200).json({
            message: "Successfully get user profile.",
            data: other
        });
    } catch (error){
        res.status(500).json(error);
    }
});

// Get other user's names & profile pictures
router.get("/:userId/all", async(req, res) => {
    try{
        const users = await User.find({
            _id: { $ne: req.params.userId }
        }).select("name profilePicture");
        res.status(200).json({
            message: "Successfully get user profile.",
            data: users
        });
    } catch (error){
        res.status(500).json(error);
    }
})

// Edit profile
router.put("/:userId", async(req, res) => {
    if(req.body.userId === req.params.userId){
        try{
            const user = await User.findByIdAndUpdate(req.params.userId, {
                $set: req.body
            });
            const updatedUser = await User.findById(req.params.userId);
            res.status(200).json({
                message: "Account has been updated.",
                data: updatedUser
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).send("You can only update your account!");
    }
});

// Edit password
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
                const updatedUser = await User.findById(req.params.userId);
                const token = jwt.sign({
                    ...updatedUser
                },
                    process.env.TOKEN
                )
                res.status(200).json({
                    message: "Password has been updated.",
                    token: token
                });
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

// Delete user
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

// Export module
module.exports = router;