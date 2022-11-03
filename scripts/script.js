const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button-rectangle')

//popups
const popupEditProfile = document.querySelector('.popup_role_edit-profile');
const popupAddCard = document.querySelector('.popup_role_add-card');
const popupImg = document.querySelector('.popup_role_show-image');

// popup close buttons
const closeBtnEdit = popupEditProfile.querySelector('.popup__uikit-close');
const closeBtnAdd = popupAddCard.querySelector('.popup__uikit-close');
const closeBtnImg = popupImg.querySelector('.popup__uikit-close');

// popup profile form 
const formElementEditProfile = popupEditProfile.querySelector('.popup__form');
let nameInput = formElementEditProfile.querySelector('.popup__input[name="traveller-name"]');
let titleInput = formElementEditProfile.querySelector('.popup__input[name="traveller-title"]');

// popup add card form 
const formElementAdd = popupAddCard.querySelector('.popup__form');
let cardNameInput = popupAddCard.querySelector('.popup__input[name="card-name"]'); 
let cardLinkInput = popupAddCard.querySelector('.popup__input[name="card-link"]'); 

// popup submit buttons
const submitBtnEdit = popupEditProfile.querySelector('.popup__button');
const submitBtnAdd = popupAddCard.querySelector('.popup__button');


//грид с картинками
const gridSection = document.querySelector('.photo-grid');
// const gridImg = document.querySelector('.photo-grid__image');


//текущие поля профиля
let currentName = document.querySelector('.profile__name');
let currentTitle = document.querySelector('.profile__title');




//получить список карточек

const initialCards = [
  {
    name: 'Ергаки',
    link: './images/ergaki.jpg'
  },
  {
    name: 'Камчатка',
    link: './images/kamchatka.jpg'
  },
  {
    name: 'Карачаево-Черкессия',
    link: './images/karachaevo-cherkessia.jpg'
  },
  {
    name: 'Маньпупунёр',
    link: './images/Man-Pupu-Ner.jpeg'
  },
  {
    name: 'Смоленск',
    link: './images/smolensk.jpg'
  },
  {
    name: 'Санкт-Петербург',
    link: './images/st-petersburg.jpg'
  },
];
//переписать
initialCards.forEach(renderCard);


// функция создания карточки из шаблона
function createCard (card) {
  const gridCardTemplate = document.querySelector('#gridcard-template').content;
  const gridCardElement = gridCardTemplate.querySelector('.photo-grid__item').cloneNode(true); 
  const image = gridCardElement.querySelector('.photo-grid__image')
  
  image.src = card.link;
  gridCardElement.querySelector('.photo-grid__name').textContent = card.name;
  
  image.addEventListener('click', function() {
    popupImg.classList.toggle('popup_opened');
    popupImg.querySelector('.popup__image').src = card.link;
    popupImg.querySelector('.popup__caption').textContent = card.name;
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

// функция открытия попапа
function popupOpen (item) {
  item.classList.toggle('popup_opened');
  if (item === popupEditProfile) {
    nameInput.value = currentName.textContent;
    titleInput.value = currentTitle.textContent;
  };
};

// функция закрытия попапа
function popupClose (item) {
  item.classList.toggle('popup_opened');
};


// функции сабмита
function popupEditProfileSubmit (evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value; 
  currentTitle.textContent = titleInput.value;
  popupEditProfile.classList.remove('popup_opened');
};

function popupAddCardSubmit (evt) {
  evt.preventDefault();
  const card = {
    name: '',
    link: ''
  }
  card.name = cardNameInput.value;
  card.link = cardLinkInput.value; 

  gridSection.prepend(createCard(card)); 

  formElementAdd.reset();

  popupAddCard.classList.remove('popup_opened');
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


// редактирование профиля

editBtn.addEventListener('click', function() {
  popupOpen(popupEditProfile);
});

closeBtnEdit.addEventListener('click', () => {
  popupClose(popupEditProfile);
});

formElementEditProfile.addEventListener('submit', popupEditProfileSubmit);




// новая карточка через попап

addBtn.addEventListener('click', () => {
  popupOpen(popupAddCard);
});

closeBtnAdd.addEventListener('click', () => {
  popupClose(popupAddCard);
});

formElementAdd.addEventListener('submit', popupAddCardSubmit);


// картинка в увеличенном формате

function openImg(link) {
  
}

closeBtnImg.addEventListener('click', ()=> {
  popupClose(popupImg);
});