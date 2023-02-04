import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
  constructor (data, popupSelector) {
    super(popupSelector);
    this._popupImage = this._item.querySelector('.popup__image');
    this._popupCaption = this._item.querySelector('.popup__caption');
    this._name = data.name;
    this._link = data.link;
  }

  open() {
    super.open();
    this._popupImage.src = this._link;
    this._popupImage.src = this._link;
    this._popupCaption.textContent = this._name;
  }
}