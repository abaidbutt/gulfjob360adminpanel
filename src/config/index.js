import axios from "axios";
export const BaseUrl = "http://gulfjobs.nwsols.com/api";
export function authHeader() {
  // return authorization header with jwt token
  const AdminUser = JSON.parse(localStorage.getItem("credentials"));

  if (AdminUser && AdminUser.token) {
    return {
      Authorization: "Bearer " + AdminUser.token,
      "Content-Type": "application/json",
    };
  } else {
    return {
      "Content-Type": "application/json",
    };
  }
}
// To add access token to every request
// axios.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("accessToken");
//     if (accessToken) {
//       config.headers["x-auth-token"] = accessToken;
//     }
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );
// // To fetch access token again using refresh token if it is expired.
// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 403 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const access_token = await  localStorage.getItem("accessToken");
//       // implement code block to make http call to refresh access token
//       originalRequest.headers["x-auth-token"] = access_token;
//       return axiosApiInstance(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );

export default axios.create({
  url: BaseUrl,
  headers: authHeader,
});
