const btnEdit = document.querySelector('.profile__edit-button');
const btnAdd = document.querySelector('.profile__add-button-rectangle')

//popups
const popupEditProfile = document.querySelector('.popup_role_edit-profile');
const popupAddCard = document.querySelector('.popup_role_add-card');
const popupImg = document.querySelector('.popup_role_show-image');
const popups = Array.from(document.querySelectorAll('.popup'));

//элементы попапа с картинкой
const imgPopUpImage = popupImg.querySelector('.popup__image');
const imgPopUpCaption = popupImg.querySelector('.popup__caption');

// popup close buttons
const btnCloseEditProfile = popupEditProfile.querySelector('.popup__uikit-close');
const btnCloseAddCard = popupAddCard.querySelector('.popup__uikit-close');
const btnCloseImgPopup = popupImg.querySelector('.popup__uikit-close');

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
function popupOpen (item) {
  item.classList.add('popup_opened');
};

// функция открытия попапа с картинкой
function openPopupImg(card) {
  imgPopUpImage.src = card.link;
  imgPopUpImage.alt = card.name;
  imgPopUpCaption.textContent = card.name;
  
  popupOpen(popupImg);
};


// функция закрытия попапа
function popupClose (item) {
  item.classList.remove('popup_opened');
};



// функции сабмита
function submitPopupEditProfile (evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value; 
  currentTitle.textContent = titleInput.value;
  popupClose(popupEditProfile);
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

  popupClose(popupAddCard);

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


// слушатели – редактирование профиля

btnEdit.addEventListener('click', function() {
  nameInput.value = currentName.textContent;
  titleInput.value = currentTitle.textContent;
  popupOpen(popupEditProfile);
});

btnCloseEditProfile.addEventListener('click', () => {
  popupClose(popupEditProfile);
});

formElementEditProfile.addEventListener('submit', submitPopupEditProfile);



// слушатели – новая карточка через попап

btnAdd.addEventListener('click', () => {
  popupOpen(popupAddCard);
});

btnCloseAddCard.addEventListener('click', () => {
  popupClose(popupAddCard);
});

formElementAdd.addEventListener('submit', submitPopupAddCard);



btnCloseImgPopup.addEventListener('click', ()=> {
  popupClose(popupImg);
});


// слушатели – закрытие попапа по клику на оверлей

popupEditProfile.addEventListener('click', function (evt) {
  if ((evt.currentTarget === evt.target)) {
    popupClose(popupEditProfile); 
  }
});

popupAddCard.addEventListener('click', function (evt) {
  if (evt.currentTarget === evt.target) {
    popupClose(popupAddCard); 
  }
});

popupImg.addEventListener('click', function (evt) {
  if (evt.currentTarget === evt.target) {
    popupClose(popupImg); 
  }
});

// слушатели – закрытие попапов по клавише ESC

document.addEventListener('keydown', (evt) => {
  popups.forEach((popup) => {
    if (evt.key === "Escape") {
      popupClose(popup); 
    }
  });
});

//получить начальный список карточек
initialCards.forEach(renderCard);