import { format } from "date-fns";
import { user,messages } from "./storage.js";
import { socket } from "./webSocket.js";

export const UI = {
  navButtons: {
    settings: document.querySelector('.nav-panel__settings'),
    signout: document.querySelector('.nav-panel__signout')
  },
  chat: {
    window: document.querySelector('.window'),
    username: document.querySelector('.nav-panel__name'),
    inputs: {
      form: document.querySelector('.type__form'),
      input: document.querySelector('.type__input'),
      button: document.querySelector('.type__send')
    }
  },
  tabs: {
    settings: {
      tab: document.querySelector('.settings'),
      forms: {
        changeUsername: document.querySelector('.settings__name__form')
      }
    },
    authorization: {
      tab: document.querySelector('.authorization'),
      forms: {
        getCode: document.querySelector('.authorization__form')
      }
    },
    authorizationAccess: {
      tab: document.querySelector('.authorization-access'),
      forms: {
        signin: document.querySelector('.authorization-access__form')
      }
    },
    closeTabButtons: document.querySelectorAll('.tab__close'),
  },
  TEMPLATES: {
    myMessage: document.querySelector('#my_message'),
    theirMessage: document.querySelector('#their_message'),
  }
}

class Message {
  constructor(from, message, date){
    this.from = from;
    this.message = message;
    this.date = date;

    if (from === user.name){
      this.messageNode = UI.TEMPLATES.myMessage.content.cloneNode(true);
    } else {
      this.messageNode = UI.TEMPLATES.theirMessage.content.cloneNode(true);
      this.messageNode.querySelector('.message__sender').textContent = from;
    }
    
    this.messageNode.querySelector('.message__content').textContent = message;
    this.messageNode.querySelector('.message__time').textContent = date;
    return this;
  }
  pushNode(where){
    UI.chat.window[where](this.getNode());
  }
  getNode(){
    return this.messageNode;
  }
}

export function updateUI(user, messages){
  if (user) UI.chat.username.textContent = user.name;
  if (messages) messages.forEach(msg => {
    updateMessage(msg);
  });
}

export function loadPartOfMessages(){
  let msg = messages.messages.pop();
  let i = 20;
  while (i && msg){
    new Message(msg.user.name, msg.text, format(new Date(msg.createdAt), 'dd.MM, HH:mm')).pushNode('prepend');
    msg = messages.messages.pop();
    i--;
  }
}

function updateMessage(message){
  const chat = UI.chat.window.parentNode;
  const needScroll = chat.scrollHeight <= chat.scrollTop + chat.offsetHeight + 1;
  new Message(message.user.name, message.text, format(new Date(message.createdAt), 'dd.MM, HH:mm')).pushNode('append');
  if (needScroll){
    chat.scrollTo(0, UI.chat.window.parentNode.scrollHeight);
  }
}

export function sendMessage(event){
  event.preventDefault();
  socket.send(JSON.stringify({
    text: UI.chat.inputs.input.value
  }));
  UI.chat.inputs.form.reset();
}

socket.onmessage = (event) => {
  updateMessage(JSON.parse(event.data));
};

UI.chat.window.parentNode.addEventListener('scroll', (event) => {
  if (event.target.scrollTop == 0) {
    const y = event.target.scrollHeight;
    loadPartOfMessages();
    event.target.scrollTo(0, event.target.scrollHeight - y)
  };
});