export class UserInfo {
  constructor({ nameSelector, titleSelector }) {
    this._nameSelector = nameSelector;
    this._titleSelector = titleSelector;
    this._currentName = document.querySelector(this._nameSelector);
    this._currentTitle = document.querySelector(this._titleSelector);
    this._nameInput = document.querySelector('.popup__input[name="travellerName"]');
    this._titleInput = document.querySelector('.popup__input[name="travellerTitle"]'); 
  }

  getUserInfo() {    
    this._nameInput.value = this._currentName.textContent;
    this._titleInput.value = this._currentTitle.textContent; 
  }

  setUserInfo(formValues) {
    this._currentName.textContent = formValues.travellerName; 
    this._currentTitle.textContent = formValues.travellerTitle; 
  }
}