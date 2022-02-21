import {UI} from "./view.js";
import { user } from "./storage.js";
import { apiData, sendRequest } from "./api.js";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNsYXZhdTIwMDJAZ21haWwuY29tIiwiaWF0IjoxNjQ1MjA5MzEwLCJleHAiOjE2NDUyOTU3MTB9.hSOgi-plPWgFH8X1cb9agz6l_bHm-vkLXxrMasGF48E'

function openTab(){
  UI.tabs[this.dataset.tab].tab.parentNode.classList.toggle('closed');
}

function closeTab(){
  this.parentNode.parentNode.parentNode.classList.toggle('closed');
}


function authorization(event){
  event.preventDefault();
  const url = new URL('https://chat1-341409.oa.r.appspot.com/api/user');
  user.email = this.querySelector('.authorization__form__input').value;
  const request = sendRequest(apiData.URLS.USER, 'POST', apiData.getHeadersUnsigned(), { 'email': user.email });
  request.then(response => response.json())
    .then(obj => {
      UI.tabs.authorizationAccess.tab.parentNode.classList.toggle('closed');
    })
    .catch(error => console.dir)
}

function authorizationEnd(event){
  event.preventDefault();
  user.token = UI.tabs.authorizationAccess.forms.signin.querySelector('.authorization-access__form__input').value
  user.saveUserdata();

  UI.tabs.authorization.tab.parentNode.classList.toggle('closed');
  UI.tabs.authorizationAccess.tab.parentNode.classList.toggle('closed');
  console.dir(user)
}

function changeUsername(event) {
  event.preventDefault();
  user.getUserdata();
  const newName = this.querySelector('.settings__name__form__input').value;
  const request = sendRequest(apiData.URLS.USER, 'PATCH', apiData.getHeadersSigned(), {'name': newName});
  request.then(response => response.json())
    .then(obj => {
      this.reset();
      closeTab.apply(this);
    })
}

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
UI.navButtons.signout.addEventListener('click', openTab);
UI.navButtons.settings.addEventListener('click', openTab);
UI.tabs.authorization.forms.getCode.addEventListener('submit', authorization)
UI.tabs.authorizationAccess.forms.signin.addEventListener('submit', authorizationEnd);
UI.tabs.settings.forms.changeUsername.addEventListener('submit', changeUsername);

for (const btn of UI.tabs.closeTabButtons){
  btn.addEventListener('click', closeTab);
}