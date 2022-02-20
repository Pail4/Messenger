export const UI = {
  navButtons: {
    settings: document.querySelector('.nav-panel__settings'),
    signout: document.querySelector('.nav-panel__signout')
  },
  chat: {
    window: document.querySelector('.window'),
    inputs: {
      form: document.querySelector('.type__form'),
      input: document.querySelector('.type__input'),
      button: document.querySelector('.type__send')
    }
  },
  tabs: {
    settings: {
      tab: document.querySelector('.settings'),
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