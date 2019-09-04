class User {
    constructor() {

    }
    storeUser(user, state = true) {
        localStorage.activeUser = JSON.stringify(user);
        localStorage.login = state;
    }

    signOut() {
        localStorage.activeUser = null;
        localStorage.login = false;
    }

    loginState() {
        return localStorage.login;
    }

    getActiveUser() {
        const activeUser = localStorage.activeUser;
        return activeUser ? JSON.parse(activeUser) : null;
    }
}