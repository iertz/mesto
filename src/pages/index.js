import './index.css';
import { Card } from '../components/Сard.js'
import { FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithImage } from '../components/PopupWithImage'
import { initialCards } from '../components/data.js'
import { UserInfo } from '../components/UserInfo.js'

const btnEdit = document.querySelector('.profile__edit-button');
const btnAdd = document.querySelector('.profile__add-button-rectangle');

const profileInfo = new UserInfo({ nameSelector: '.profile__name', titleSelector: '.profile__title' });

//popups
const popupEditProfile = new PopupWithForm( {
  submitter: (formValues) => {
    profileInfo.setUserInfo(formValues);
  }
}, '.popup_role_edit-profile');

popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm( {
  submitter: (formValues) => {
    const item = {
      name: '',
      link: ''
    }

    item.name = formValues.cardTitle;
    item.link = formValues.cardLink; 

  
    const additionalCard = new Section({
      item: item,
      renderer: (item) => {
          additionalCard.prependItem(createCard(item));
        }
      },
      '.photo-grid'
    );

    additionalCard.renderItem();
    
    popupAddCard.close();
  }
}, '.popup_role_add-card');

popupAddCard.setEventListeners();


function createCard(item) {
    const card = new Card(item, '#gridcard-template')
    const cardElement = card.createCard();
    return cardElement;
}

// popup add card form 
const popupAddCardEl = document.querySelector('.popup_role_add-card');
const formElementAdd = popupAddCardEl.querySelector('.popup__form');

// popup profile form 
const popupEditProfileEl = document.querySelector('.popup_role_edit-profile');
const formElementEditProfile = popupEditProfileEl.querySelector('.popup__form');
const nameInput = formElementEditProfile.querySelector('.popup__input[name="travellerName"]');
const titleInput = formElementEditProfile.querySelector('.popup__input[name="travellerTitle"]'); 



//валидаторы
const validatorProfile = new FormValidator({
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}, formElementEditProfile);

validatorProfile.enableValidation();

const validatorAddCard = new FormValidator({
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}, formElementAdd);

validatorAddCard.enableValidation();


// слушатель – открытие формы добавления новой карточка через попап
btnAdd.addEventListener('click', () => {  
  validatorAddCard.toggleButtonState();
  popupAddCard.open();
  
});

// слушатель – открытие данных профиля
btnEdit.addEventListener('click', function() {
  const userInfo = profileInfo.getUserInfo();
  nameInput.value = userInfo.name; 
  titleInput.value = userInfo.title; 
  popupEditProfile.open();
});


const popupWithImg = new PopupWithImage('.popup_role_show-image');
popupWithImg.setEventListeners();


//получить начальный список карточек
initialCards.forEach((item) => {
    const cardList = new Section({
      item: item,
      renderer: (item) => {
        cardList.appendItem(createCard(item));
      }
    },
    '.photo-grid'
    );
  cardList.renderItem();
});

export { popupWithImg } 