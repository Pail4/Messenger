import Cookies from 'js-cookie';

export const user = {
  nickname: "",
  email: "",
  token: "",
  saveUserdata() {
    Cookies.set('user', JSON.stringify(this));
  },
  getUserdata() {
    const data = JSON.parse(Cookies.get('user') || {});
    for (const key in data){
      this[key] = data[key];
    }
  }
}


// class User {
//   constructor(options = {nickname: "name", email: "", token: ""}){
//     this.nickname = options?.nickname;
//     this.email = options?.email;
//     this.token = options?.token;
//   }
// }