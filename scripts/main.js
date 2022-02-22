import {UI, updateUI, sendMessage} from "./view.js";
import { user } from "./storage.js";
import { apiData, sendRequest } from "./api.js";

function openTab(){
  UI.tabs[this.dataset.tab].tab.parentNode.classList.toggle('closed');
}

function closeTab(){
  this.parentNode.parentNode.parentNode.classList.toggle('closed');
}


function authorization(event){
  event.preventDefault();
  
  const email = this.querySelector('.authorization__form__input').value;
  if (email.length < 2){
    alert("Введите корректный email");
    this.reset();
    return;
  }
  user.email = email;

  const request = sendRequest(apiData.URLS.USER, 'POST', apiData.getHeadersUnsigned(), { 'email': user.email });
  request.then(response => response.json())
    .then(obj => {
      UI.tabs.authorizationAccess.tab.parentNode.classList.toggle('closed');
    })
    .catch(error => alert);
}

function checkToken(event){
  event.preventDefault();

  const token = UI.tabs.authorizationAccess.forms.signin.querySelector('.authorization-access__form__input').value
  try {
    loadUserdata(token);
  } catch(err) {
    alert("Неверный токен");
    this.reset();
    return;
  }

  UI.tabs.authorization.tab.parentNode.classList.toggle('closed');
  UI.tabs.authorizationAccess.tab.parentNode.classList.toggle('closed');
}

function loadUserdata(token){
  const request = sendRequest(apiData.URLS.getUserData, 'GET', apiData.getHeadersSigned(token));
  request.then(response => response.json())
    .then(obj => {
      if (!obj.token) throw new Error('Authorization error');
      user.token = obj.token;
      user.name = obj.name;
      user.saveUserdata();
      updateUI(user);
    });
}

function changeUsername(event) {
  event.preventDefault();
  //
  const newName = this.querySelector('.settings__name__form__input').value;
  const request = sendRequest(apiData.URLS.USER, 'PATCH', apiData.getHeadersSigned(), {'name': newName});
  request.then(response => response.json())
    .then(obj => {
      this.reset();
      UI.chat.username.textContent = newName;
      closeTab.apply(this);
    });
}

function loadMessages(){
  const request = sendRequest(apiData.URLS.MESSAGES, 'GET', apiData.getHeadersSigned());
  request.then(response => response.json())
    .then(obj => {
      updateUI(null, obj);
    })
}



function setEventsListeners(){
  UI.chat.inputs.form.addEventListener('submit', sendMessage);
  UI.navButtons.signout.addEventListener('click', openTab);
  UI.navButtons.settings.addEventListener('click', openTab);
  UI.tabs.authorization.forms.getCode.addEventListener('submit', authorization)
  UI.tabs.authorizationAccess.forms.signin.addEventListener('submit', checkToken);
  UI.tabs.settings.forms.changeUsername.addEventListener('submit', changeUsername);

  for (const btn of UI.tabs.closeTabButtons){
    btn.addEventListener('click', closeTab);
  }
}

function checkAuth(){
  try {
    //why error not catched?
    user.getUserdata();
    loadUserdata(user.token);
  } catch(error){
    openTab.apply({dataset:{tab: 'authorization'}});
  }
}

setEventsListeners();
checkAuth();
loadMessages();