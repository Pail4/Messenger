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
    if (!temp) return false;
    const data = JSON.parse(temp);
    for (const key in data){
      this[key] = data[key];
    };
    return true;
  }
}

export const messages = {
  messages: []
};