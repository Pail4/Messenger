import {format} from "date-fns";
import { user } from "./storage";

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
  }

  getNode(){
    return this.messageNode;
  }
}


export function updateUI(user, messages){
  if (user) UI.chat.username.textContent = user.name;
  if (messages) updateMessages(messages);
}

function updateMessages(messages){
  for (const msg of messages.messages){
    const msgNode = new Message(msg.username, msg.message, format(new Date(msg.createdAt), 'dd.MM, HH:mm'));
    UI.chat.window.append(msgNode.getNode());
  }
}

export function sendMessage(event){
  event.preventDefault();
  const msgNode = new Message(user.name, UI.chat.inputs.input.value, format(new Date(), 'HH:mm'));

  UI.chat.window.append(msgNode.getNode());
  UI.chat.window.parentNode.scrollTo(0, UI.chat.window.parentNode.scrollHeight);
  UI.chat.inputs.form.reset();
}