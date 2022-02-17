import {UI} from "./view.js";
function sendMessage(event){
  event.preventDefault();
  const messageText = UI.chat.inputs.input.value;
  if (!messageText) return;
  const messageNode = UI.TEMPLATES.myMessage.content.cloneNode(true);
  const date = new Date();

  messageNode.querySelector('.message__content').textContent = messageText;
  messageNode.querySelector('.message__time').textContent = date.getHours() + ':' + date.getMinutes();
  UI.chat.window.append(messageNode);
  UI.chat.window.parentNode.scrollTo(0, UI.chat.window.parentNode.scrollHeight);
  UI.chat.inputs.form.reset();
}

UI.chat.inputs.form.addEventListener('submit', sendMessage);