// Import modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Import models
const Post = require("../models/Post");
const User = require("../models/User");

// Add routes
router.get("/:postId", async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId);
        const {updatedAt, __v, ...other} = post._doc;
        res.status(200).json({
            message: "Successfully get a post detail.",
            data: other
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/", async (req, res) => {
    try{
        const newPost = new Post(req.body);
        const savePost = await newPost.save();
        res.status(200).json({
            message: "Successfully create a post.",
            data: savePost
        })         
    } catch(error) {
        res.status(500).json(error);
    }
});

router.put("/:postId", async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId);
        if(post.userId === req.body.userId) {
            await post.updateOne({
                $set: req.body
            });
            res.status(200).json("Post has been updated.");
        } else {
            res.status(403).json("You can only update your post!")
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/:postId/like", async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId);
        const currentUser = await User.findById(req.body.userId);
        if(post.likes.filter(like => like.userId === req.body.userId).length === 0){
            await post.updateOne({
                $push: {likes: {
                    userId: req.body.userId,
                    name: currentUser.name,
                }}
            });
            res.status(200).json({
                message: "Successfully liked the post.",
                data: {
                    postId: req.params.postId,
                    caption: post.caption,
                    image: post.image
                }
            });
        } else {
            await post.updateOne({
                $pull: {likes: {
                    userId: req.body.userId,
                    name: currentUser.name,
                }}
            });
            res.status(200).json({
                message: "Successfully disliked the post.",
                data: {
                    postId: req.params.postId,
                    caption: post.caption,
                    image: post.image
                }
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/:postId", async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId);
        if(post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("Post has been deleted.");
        } else {
            res.status(403).json("You can only delete your post!")
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/timeline/:userId", async(req, res) => {
    try{
        const currentUser = await User.findById(req.params.userId);
        const adminUser = await User.findOne({
            isAdmin: true
        });
        const userPosts = await Post.find({
            userId: currentUser._id
        });
        const friendPosts = currentUser.followings ? 
        await Promise.all(
            currentUser.followings.map(friend => {
                return Post.find({
                    userId: friend.userId
                })
            })
        ) : 
        [];
        const adminPosts = await Post.find({
            userId: adminUser._id
        });
        const allUsersPosts = await Post.find({
            userId: { $ne: adminUser._id }
        });
        if(currentUser.isAdmin){
            res.status(200).json({
                message: "Successfully get timeline posts.",
                data: allUsersPosts
            });
        } else {
            res.status(200).json({
                message: "Successfully get timeline posts.",
                data: userPosts.concat(...friendPosts, ...adminPosts)
            });
        }
        
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get("/profile/:userId", async(req, res) => {
    try{
        const user = await User.findById(req.params.userId);
        const posts = await Post.find({
            userId: user._id
        });
        res.status(200).json({
            message: "Successfully get the user's posts.",
            data: posts
        });
    } catch (error) {
        res.status(500).json(error);
    }
})

// Export module
module.exports = router;