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

const Conversation = require("./models/Conversation");
const Message = require("./models/Message");

// Initiate app & socket
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000"
    }
});

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

// Setting up Sockets

// Specify user
let users = new Map();

// User connect
const addUser  = (userId, socketId) => {
    users.set(userId, socketId);
};

// User disconnect
const removeUser  = (userId, socketId) => {
    users.delete(userId);
};

// Get a user's socket data
const getUser = (userId) => {
    return(users.get(userId));
};

// Create connection
io.on("connection", (socket) => {
    // A user connect
    console.log("A user connected.");
    addUser(socket.handshake.query["userId"], socket.id);
    io.emit("getOnlineUsers", users);

    // Send & get direct message
    socket.on("createConversation", async ({name, senderId, receiverId}, callback) => {
        if(name === ""){
            const newConversation = new Conversation({
                name: name,
                members: [senderId, receiverId]
            });

            try{
                const savedConversation = await newConversation.save();
                callback({
                    conversationId: savedConversation._id
                });
            } catch (error) {
                res.status(500).json(error);
            }
        }  else {
            const newConversation = new Conversation({
                name: name,
                members: [senderId]
            });

            try{
                const savedConversation = await newConversation.save();
                const updatedChannelList = await Conversation.find({
                    name:   {"$exists" : true, "$ne" : ""}
                });
                callback({
                    conversationId: savedConversation._id
                });
                io.emit("updatedChannelList", updatedChannelList);
            } catch (error) {
                res.status(500).json(error);
            }
        }
    });


    // Send & get direct message
    socket.on("sendDirectMessage", async ({sender, receiver, text, conversationId}) => {
        const receiverSocket = getUser(receiver);
        const senderSocket = getUser(sender);
        const newMessage = new Message({
            conversationId: conversationId,
            sender: sender,
            text: text
        });
        
        try{
            const savedMessage = await newMessage.save();
            const updatedMessages = await Message.find({
                conversationId: conversationId
            });
            io.to(senderSocket).emit("getDirectMessage", 
                updatedMessages
            );
            io.to(receiverSocket).emit("getDirectMessage", 
                updatedMessages
            );
        } catch (error) {
            res.status(500).json(error);
        }
    });

    // Join channel
    socket.on("joinChannel", async({channelId, channelName, userId}) => {
        socket.join(channelName);
    
        try{
            const conv = await Conversation.findById(channelId);
            if(conv.members?.filter(member => member === userId)?.length === 0){
                try{
                    const updatedChannel = await Conversation.findByIdAndUpdate(
                        channelId,
                        {$push: {members: userId}},
                        {new: true}            
                    );
                    socket.to(channelName).emit("updatedChannelMembers", updatedChannel);
                } catch (error) {
                    res.status(500).json(error);
                }
            }
        } catch (error) {
            res.status(500).json(error);
        }
    })

    // Send & get channel message
    socket.on("sendChannelMessage", async ({sender, text, channelName, conversationId}) => {
        const newMessage = new Message({
            conversationId: conversationId,
            sender: sender,
            text: text
        });
        
        try{
            const savedMessage = await newMessage.save();
            const updatedMessages = await Message.find({
                conversationId: conversationId
            });
            io.to(channelName).emit("getChannelMessage", updatedMessages);
        } catch (error) {
            res.status(500).json(error);
        }
    });

    // A user disconnect
    socket.on("disconnect", () =>{
        console.log("A user disconnected.");
        removeUser(socket.id);

        // Send online users to everyone
        io.emit("getOnlineUsers", users);
    });
});




// Start server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});