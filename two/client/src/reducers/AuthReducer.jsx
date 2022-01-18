export const AuthReducer = (user, action) => {
    switch(action.type) {
        case "LOGIN":
            return {
                loggedIn : action.username
            };
        case "LOGOUT":
            return {
                loggedIn : null
            };
        default:
            return user;
    }
}