export const AuthReducer = (user, action) => {
    switch(action.type) {
        case "LOGIN":
            return {
                loggedIn : action.user
            };
        case "LOGOUT":
            return {
                loggedIn : null
            };
        default:
            return user;
    }
}