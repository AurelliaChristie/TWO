// Import modules
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const path = require("path");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

// Initiate app
const app = express();

// Connect to database
mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
    console.log("Connected to MongoDB database");
});

// Add static
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Add middleware
app.use(express.json()); //body parser
app.use(helmet()); //security related HTTP response headers
app.use(morgan("common")); //simplifies logging request to the app
app.use(cors());

// Set upload 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cn(null, req.body.name);
    }
});

const upload = multer({ storage: storage});

// Add routes
app.post("/upload", upload.single("file"), (req, res) => {
    try{
        return res.status(200).json("File uploaded successfully");
    } catch (error) {
        console.log(error);
    }
});
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/posts", postRoute);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});