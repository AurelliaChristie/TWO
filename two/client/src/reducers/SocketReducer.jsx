export const SocketReducer = (socket, action) => {
    switch(action.type) {
        case "CONNECT":
            return {
                socket : action.socket,
                onlineUsers: action.onlineUsers
            };
        case "DISCONNECT":
            return {
                socket : null
            };
        default:
            return socket;
    }
}