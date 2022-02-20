import {Cookies} from "js-cookie";
export const user = {
  nickname: "",
  email: "",
  token: "",
  saveToken() {
    Cookies.set('token', this.token);
  },
  getToken() {
    return Cookies.get('token');
  }
}


// class User {
//   constructor(options = {nickname: "name", email: "", token: ""}){
//     this.nickname = options?.nickname;
//     this.email = options?.email;
//     this.token = options?.token;
//   }
// }