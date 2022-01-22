// Import modules
const express = require("express");
const router = express.Router();
const multer = require("multer");

// Add routes
// Profile pictures
const storage_profile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/profiles");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});
const upload_profile = multer({ storage: storage_profile });
router.post("/profile", upload_profile.single("file"), (req, res) => {
    try{
        return res.status(200).json("File uploaded successfully");
    } catch (error) {
        console.log(error);
    }
});

// Cover picture
const storage_cover = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/covers");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});
const upload_cover = multer({ storage: storage_cover });
router.post("/cover", upload_cover.single("file"), (req, res) => {
    try{
        return res.status(200).json("File uploaded successfully");
    } catch (error) {
        console.log(error);
    }
});

// Post picture
const storage_post = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/posts");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});
const upload_post = multer({ storage: storage_post });
router.post("/post", upload_post.single("file"), (req, res) => {
    try{
        return res.status(200).json("File uploaded successfully");
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;