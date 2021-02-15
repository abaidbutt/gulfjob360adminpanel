export default class Auth {
  static getToken() {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken;
  }
  static clearToken() {
    localStorage.clear();
  }
  static setToken(userToken) {
    localStorage.setItem("token", JSON.stringify(userToken));
  }
}
