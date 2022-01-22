// Import modules
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Import models
const User = require("../models/User");

// Add routes
router.post("/signup", async (req, res) => {
    if(req.body.password === req.body.confirmPassword){
        try{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const user = new User({
                username: req.body.username,
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });
            const saveUser = await user.save();
            res.status(200).json({
                message: "Successfully registered a user.",
                data: saveUser
            });
        } catch(error) {
            res.status(500).json(error);
        }
    } else {
        return res.status(400).send("Password and password confirmation contain different values.");
    }
});

router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({
            username: req.body.username
        });
        if(!user){
            res.status(404).json("User not found.");
        } else {
            try{
                const validPassword = await bcrypt.compare(req.body.password, user.password);
                if(!validPassword){
                    res.status(400).json("Wrong Password.");
                } else {
                    const token = jwt.sign({
                        ...user
                    },
                        process.env.TOKEN
                    )
                    res.status(200).json({
                        message: "Successfully logged in.",
                        token: token
                    });
                }
            } catch (error) {
                res.status(500).json(error);
            }
        }
    } catch (error){
        res.status(500).json(error);
    } 
});

// Export module
module.exports = router;