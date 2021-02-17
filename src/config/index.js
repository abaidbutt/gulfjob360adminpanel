import axios from "axios";
export const BaseUrl = "http://gulfjobs.nwsols.com/api";
// export function authHeader() {
//   // return authorization header with jwt token
//   let AdminUser = JSON.parse(localStorage.getItem('admin-user'));

//   if (AdminUser && AdminUser.token) {
//       return { 'Authorization': 'Bearer ' + AdminUser.token , 'Content-Type': 'application/json' };
//   } else {
//       return {};
//   }
// }
export default axios.create({
  url: BaseUrl,
  headers: {
    "content-type": "application/json",
  },
});
