import { openPopup, deleteCard, likeCard } from './script.js'

export class Card {
  constructor(data, templateSelector){
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector; 
  }

  // получаем элемент карточки из темплейта
  _getTemplate() {
    const gridCardEl = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.photo-grid__item')
    .cloneNode(true);

    return gridCardEl;
  } 
  // метод для открытия попапа с картинкой
  _openPopupImg() {
    const popupImg = document.querySelector('.popup_role_show-image');
    const imgPopUpImage = popupImg.querySelector('.popup__image');
    const imgPopUpCaption = popupImg.querySelector('.popup__caption');

    imgPopUpImage.src = this._link;
    imgPopUpImage.alt = this._name;
    imgPopUpCaption.textContent = this._name;
  
    openPopup(popupImg);
  }
  
  // слушатели
  _setEventListeners() {
    this._element.querySelector('.photo-grid__uikit-trash').addEventListener('click', deleteCard);
    this._element.querySelector('.photo-grid__uikit-like').addEventListener('click', likeCard);
    this._element.querySelector('.photo-grid__image').addEventListener('click', () => {
      this._openPopupImg();
    });
  };

  // публичный метод для наполнения элемент карточки содержимым - т.е. по факту для создания карточки
  createCard() {
    this._element = this._getTemplate(this._templateSelector);
    this._setEventListeners();

    this._image = this._element.querySelector('.photo-grid__image');
  
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.photo-grid__name').textContent = this._name;
  
    return this._element;
  } 
}