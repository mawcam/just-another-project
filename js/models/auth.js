class Authenticator {
  static signIn(user) {
    localStorage.activeUser = JSON.stringify(user);
    localStorage.login = true;
  }

  static signOut() {
    localStorage.activeUser = null;
    localStorage.login = false;
  }

  static isUserLogged() {
    return localStorage.login === 'true';
  }

  static getActiveUser() {
      const activeUser = localStorage.activeUser;
      return activeUser ? JSON.parse(activeUser) : null;
  }
}
