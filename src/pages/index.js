import './index.css';
import { Card } from '../components/Сard.js'
import { FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
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
          const card = new Card(item, '#gridcard-template')
  
          const cardElement = card.createCard();
  
          additionalCard.prependItem(cardElement);
        }
      },
      '.photo-grid'
    );
    additionalCard.renderItem();
    popupAddCard.close();
  }
}, '.popup_role_add-card');

// popup add card form 
const popupAddCardEl = document.querySelector('.popup_role_add-card');
const formElementAdd = popupAddCardEl.querySelector('.popup__form');

// popup profile form 
const popupEditProfileEl = document.querySelector('.popup_role_edit-profile');
const formElementEditProfile = popupEditProfileEl.querySelector('.popup__form');



//валидаторы
const validatorProfile = new FormValidator({
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}, formElementEditProfile);

const validatorAddCard = new FormValidator({
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}, formElementAdd);




// слушатель – открытие формы добавления новой карточка через попап
btnAdd.addEventListener('click', () => {  
  validatorAddCard.toggleButtonState();
  validatorAddCard.enableValidation();
  popupAddCard.open();
  popupAddCard.setEventListeners();
  
});

// слушатель – открытие данных профиля
btnEdit.addEventListener('click', function() {
  profileInfo.getUserInfo();
  validatorProfile.enableValidation();
  popupEditProfile.open();
  popupEditProfile.setEventListeners();
});



//получить начальный список карточек
initialCards.forEach((item) => {
    const cardList = new Section({
      item: item,
      renderer: (item) => {
        const card = new Card(item, '#gridcard-template')

        const cardElement = card.createCard();

        cardList.appendItem(cardElement);
      }
    },
    '.photo-grid'
  );
  cardList.renderItem();
});