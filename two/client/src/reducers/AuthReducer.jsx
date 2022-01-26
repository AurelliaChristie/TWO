export const AuthReducer = (user, action) => {
    switch(action.type) {
        case "LOGIN":
            return {
                loggedIn : action.user,
                socket: action.socket
            };
        case "LOGOUT":
            return {
                loggedIn : null,
                socket: null
            };
        default:
            return user;
    }
}