// Import modules
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const path = require("path");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const uploadRoute = require("./routes/upload");

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
app.use("/images/posts", express.static(path.join(__dirname, "./public/images/posts")));
app.use("/images/covers", express.static(path.join(__dirname, "./public/images/covers")));
app.use("/images/profiles", express.static(path.join(__dirname, "./public/images/profiles")));

// Add middleware
app.use(express.json()); //body parser
app.use(helmet()); //security related HTTP response headers
app.use(morgan("common")); //simplifies logging request to the app
app.use(cors());

//  Add routes
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/posts", postRoute);
app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);
app.use("/upload", uploadRoute);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});