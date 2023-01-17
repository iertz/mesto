import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

const btnEdit = document.querySelector('.profile__edit-button');
const btnAdd = document.querySelector('.profile__add-button-rectangle');

//popups
const popupEditProfile = document.querySelector('.popup_role_edit-profile');
const popupAddCard = document.querySelector('.popup_role_add-card');
const popups = document.querySelectorAll('.popup');

//формы 
const forms = Array.from(document.querySelectorAll('.popup__form'));

//валидатор


forms.forEach((form) => {
  const validator = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }, form);

  validator.enableValidation();

  // слушатель – открытие формы добавления новой карточка через попап
  btnAdd.addEventListener('click', () => {  
    validator.toggleButtonState();
    openPopup(popupAddCard);
  });

})

// popup profile form 
const formElementEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = formElementEditProfile.querySelector('.popup__input[name="traveller-name"]');
const titleInput = formElementEditProfile.querySelector('.popup__input[name="traveller-title"]');

// popup add card form 
const formElementAdd = popupAddCard.querySelector('.popup__form');
const submitBtnAddCard = formElementAdd.querySelector('.popup__button');
const cardNameInput = popupAddCard.querySelector('.popup__input[name="card-name"]'); 
const cardLinkInput = popupAddCard.querySelector('.popup__input[name="card-link"]');

// popup image
const popupImg = document.querySelector('.popup_role_show-image');
const imgPopUpImage = popupImg.querySelector('.popup__image');
const imgPopUpCaption = popupImg.querySelector('.popup__caption');

//грид с картинками
const gridSection = document.querySelector('.photo-grid');


//текущие поля профиля
const currentName = document.querySelector('.profile__name');
const currentTitle = document.querySelector('.profile__title');



// функция открытия обычного попапа
function openPopup (item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};


// функция закрытия попапа кнопкой Esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'))
  }
}; 

// функция закрытия попапа
function closePopup (item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

// функция закрьтия попапа по клику на крестик или оверлей
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if ((evt.target.classList.contains('popup_opened')) || (evt.target.classList.contains('popup__close-svg'))) {
            closePopup(popup)
      };  
    });
});


// функция для создания карточки
function renderCard(item) {
  const card = new Card(item, '#gridcard-template');
  const cardElement = card.createCard();
  return cardElement
}


// функция сабмита в профиле
function submitPopupEditProfile (evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value; 
  currentTitle.textContent = titleInput.value;
  closePopup(popupEditProfile);
};

// функция сабмита – добавить новую карточку 
function submitPopupAddCard (evt) {
  evt.preventDefault();
  const item = {
    name: '',
    link: ''
  }
  item.name = cardNameInput.value;
  item.link = cardLinkInput.value; 

  gridSection.prepend(renderCard(item)); 

  closePopup(popupAddCard);

  formElementAdd.reset();
};


// слушатели – открытие данных профиля
btnEdit.addEventListener('click', function() {
  nameInput.value = currentName.textContent;
  titleInput.value = currentTitle.textContent;
  openPopup(popupEditProfile);
});



formElementEditProfile.addEventListener('submit', submitPopupEditProfile);

formElementAdd.addEventListener('submit', submitPopupAddCard);


//получить начальный список карточек
initialCards.forEach((item) => {
  gridSection.append(renderCard(item));
});


export { openPopup, popupImg, imgPopUpImage, imgPopUpCaption, cardNameInput, cardLinkInput }