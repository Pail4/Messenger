import { user } from "./storage.js";
export const apiData = {
  URLS: {
    ORIGIN: 'https://chat1-341409.oa.r.appspot.com/',
    API: 'https://chat1-341409.oa.r.appspot.com/api/',
    USER: 'https://chat1-341409.oa.r.appspot.com/api/user',
    getUserData: 'https://chat1-341409.oa.r.appspot.com/api/user/me'
  },
  getHeadersUnsigned(){
    return {
      'Content-Type': 'application/json;charset=utf-8',
    }
  },
  getHeadersSigned(){
    return {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${user.token}`
    }
  },
}

export function sendRequest(url, method, headers, body) {
  return fetch(url, {
    method,
    headers,
    'body': JSON.stringify(body)
  });
}