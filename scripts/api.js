import { user } from "./storage.js";
export const apiData = {
  URLS: {
    ORIGIN: 'https://note-lawn.ru/',
    API: 'https://note-lawn.ru/api/masager',
    USER: 'https://note-lawn.ru/api/masager/user',
    getUserData: 'https://note-lawn.ru/api/masager/user/me',
    MESSAGES: 'https://note-lawn.ru/api/masager/messages/',
    getSocket(){
      user.getUserdata();
      return `wss://note-lawn.ru/websocket/masager?${user.token}`
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

