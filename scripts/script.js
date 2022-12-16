
const btnEdit = document.querySelector('.profile__edit-button');
const btnAdd = document.querySelector('.profile__add-button-rectangle')

//popups
const popupEditProfile = document.querySelector('.popup_role_edit-profile');
const popupAddCard = document.querySelector('.popup_role_add-card');
const popupImg = document.querySelector('.popup_role_show-image');
const popups = document.querySelectorAll('.popup');

//элементы попапа с картинкой
const imgPopUpImage = popupImg.querySelector('.popup__image');
const imgPopUpCaption = popupImg.querySelector('.popup__caption');

// popup profile form 
const formElementEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = formElementEditProfile.querySelector('.popup__input[name="traveller-name"]');
const titleInput = formElementEditProfile.querySelector('.popup__input[name="traveller-title"]');

// popup add card form 
const formElementAdd = popupAddCard.querySelector('.popup__form');
const cardNameInput = popupAddCard.querySelector('.popup__input[name="card-name"]'); 
const cardLinkInput = popupAddCard.querySelector('.popup__input[name="card-link"]');

//грид с картинками
const gridSection = document.querySelector('.photo-grid');


//текущие поля профиля
const currentName = document.querySelector('.profile__name');
const currentTitle = document.querySelector('.profile__title');


// функция создания карточки из шаблона
function createCard (card) {
  const gridCardTemplate = document.querySelector('#gridcard-template').content;
  const gridCardElement = gridCardTemplate.querySelector('.photo-grid__item').cloneNode(true); 
  const image = gridCardElement.querySelector('.photo-grid__image')
  
  image.src = card.link;
  image.alt = card.name;
  gridCardElement.querySelector('.photo-grid__name').textContent = card.name;
  
  image.addEventListener('click', () => {
    openPopupImg(card);
  });

  gridCardElement.querySelector('.photo-grid__uikit-trash').addEventListener('click', deleteCard);
  gridCardElement.querySelector('.photo-grid__uikit-like').addEventListener('click', likeCard);

  return gridCardElement;
};


// функция добавления новой карточки в разметку
function renderCard (card) {
  const newCard = createCard(card);
  gridSection.append(newCard);
};

// функция открытия обычного попапа
function openPopup (item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

// функция открытия попапа с картинкой
function openPopupImg(card) {
  imgPopUpImage.src = card.link;
  imgPopUpImage.alt = card.name;
  imgPopUpCaption.textContent = card.name;
  
  openPopup(popupImg);
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
      if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-svg')) {
          closePopup(popup)
      }
    })
})


// функции сабмита
function submitPopupEditProfile (evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value; 
  currentTitle.textContent = titleInput.value;
  closePopup(popupEditProfile);
};

function submitPopupAddCard (evt) {
  evt.preventDefault();
  const card = {
    name: '',
    link: ''
  }
  card.name = cardNameInput.value;
  card.link = cardLinkInput.value; 

  gridSection.prepend(createCard(card)); 

  closePopup(popupAddCard);

  formElementAdd.reset();
};

//функция удаления
function deleteCard(event) {
  const targetEl = event.target;
  targetEl.closest('.photo-grid__item').remove();
};

//функция лайка
function likeCard(event) {
  const targetEl = event.target;  
  targetEl.classList.toggle('photo-grid__uikit-like_active');
};


// слушатель – открытие и сабмит данных профиля

btnEdit.addEventListener('click', function() {
  nameInput.value = currentName.textContent;
  titleInput.value = currentTitle.textContent;
  openPopup(popupEditProfile);
});

formElementEditProfile.addEventListener('submit', submitPopupEditProfile);



// слушатели – открытие и самбит формы добавления новой карточка через попап

btnAdd.addEventListener('click', () => {
  const submitBtn = formElementAdd.querySelector('.popup__button');
  const submitBtnText = formElementAdd.querySelector('.popup__button-text');
  
  if ((cardLinkInput.value === '') || (cardNameInput.value === '')) {
    submitBtn.setAttribute('disabled', '');
    submitBtn.classList.add('popup__button_disabled');
    submitBtnText.classList.add('popup__button-text_disabled');
  }
  openPopup(popupAddCard);
});

formElementAdd.addEventListener('submit', submitPopupAddCard);


//получить начальный список карточек
initialCards.forEach(renderCard);