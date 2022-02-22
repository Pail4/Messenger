import Cookies from 'js-cookie';

export const user = {
  name: "You",
  email: "",
  token: "",
  saveUserdata() {
    Cookies.set('user', JSON.stringify(this));
  },
  getUserdata() {
    const temp = Cookies.get('user');
    if (!temp) throw new Error('Authorization error');
    const data = JSON.parse(temp);
    for (const key in data){
      this[key] = data[key];
    };
  }
}