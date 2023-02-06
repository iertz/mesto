export class UserInfo {
  constructor({ nameSelector, titleSelector }) {
    this._nameSelector = nameSelector;
    this._titleSelector = titleSelector;
    this._currentName = document.querySelector(this._nameSelector);
    this._currentTitle = document.querySelector(this._titleSelector);
  }

  getUserInfo() {    
    const userInfo = {};

    userInfo.name = this._currentName.textContent;
    userInfo.title = this._currentTitle.textContent; 

    return userInfo;
  }

  setUserInfo(formValues) {
    this._currentName.textContent = formValues.travellerName; 
    this._currentTitle.textContent = formValues.travellerTitle; 
  }
}