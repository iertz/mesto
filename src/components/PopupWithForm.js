import { Popup } from './Popup.js'

export class PopupWithForm extends Popup  {
  constructor ({ submitter }, popupSelector ) {
    super(popupSelector);
    this._submitter = submitter;
    this._form = this._item.querySelector('.popup__form');
  }
  
  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitter(this._getInputValues());
      this.close();
    })
  }

  close() {
    this._form.reset();
    super.close();
  }
}