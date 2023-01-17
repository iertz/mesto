import { openPopup, popupImg, imgPopUpImage, imgPopUpCaption } from './script.js'

export class Card {
  constructor(data, templateSelector){
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector; 
  }

  // получаем элемент карточки из темплейта
  _getTemplate() {
    return document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.photo-grid__item')
    .cloneNode(true);
  } 

  // хэндлеры событий в карточке
  _deleteCard(event) {
    const targetEl = event.target;
    targetEl.closest('.photo-grid__item').remove();
  }
    
  _likeCard(event) {
    const targetEl = event.target;  
    targetEl.classList.toggle('photo-grid__uikit-like_active');
  }

  // метод для открытия попапа с картинкой
  _openPopupImg() {
    imgPopUpImage.src = this._link;
    imgPopUpImage.alt = this._name;
    imgPopUpCaption.textContent = this._name;
  
    openPopup(popupImg);
  }
  
  // слушатели
  _setEventListeners() {
    this._element.querySelector('.photo-grid__uikit-trash').addEventListener('click', this._deleteCard);
    this._element.querySelector('.photo-grid__uikit-like').addEventListener('click', this._likeCard);
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