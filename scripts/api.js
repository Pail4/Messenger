import { user } from "./storage.js";
export const apiData = {
  URLS: {
    ORIGIN: 'https://chat1-341409.oa.r.appspot.com/',
    API: 'https://chat1-341409.oa.r.appspot.com/api/',
    USER: 'https://chat1-341409.oa.r.appspot.com/api/user',
    getUserData: 'https://chat1-341409.oa.r.appspot.com/api/user/me',
    MESSAGES: 'https://chat1-341409.oa.r.appspot.com/api/messages/',
    getSocket(){
      user.getUserdata();
      return `ws://chat1-341409.oa.r.appspot.com/websockets?${user.token}`
    }
  },
  getHeadersUnsigned(){
    return {
      'Content-Type': 'application/json;charset=utf-8',
    }
  },
  getHeadersSigned(token){
    return {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token || user.token}`
    }
  },

}

export function sendRequest(url, method, headers, body) {
  const strBody = body? JSON.stringify(body) : undefined;
  return fetch(url, {
    method,
    headers,
    'body': strBody
  });
}

