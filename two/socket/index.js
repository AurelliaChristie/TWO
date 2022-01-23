// Port used: 5000
const io = require("socket.io")(5000, {
    cors:{
        origin:"http://localhost:3000"
    }
});

// Specify user
let users = [];

// User connect
const addUser  = (userId, socketId) => {
    !users.some(user => user.userId === userId) && 
        users.push({
            userId: userId, 
            socketId: socketId
        });
};

// User disconnect
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId != socketId);
};

// Get a user's socket data
const getUser = (userId) => {
    return(users.find((user) => user.userId === userId));
};

// Create connection
io.on("connection", (socket) => {
    // A user connect
    console.log("A user connected.");

    // Take user ID from client
    socket.on("sendUserId", (userId) => {
        addUser(userId, socket.id);
        // Send online users to everyone
        io.emit("getOnlineUsers", users);
    });

    // Send & get direct message
    socket.on("sendDirectMessage", ({senderId, receiverId, text}) => {
        const receiver = getUser(receiverId);
        io.to(receiver?.socketId).emit("getDirectMessage", {
            senderId: senderId,
            text: text
        });
    });

    // A user disconnect
    socket.on("disconnect", () =>{
        console.log("A user disconnected.");
        removeUser(socket.id);
        // Send online users to everyone
        io.emit("getOnlineUsers", users);
    });
});
