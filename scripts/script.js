const editBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.popup__uikit-close');
const submitBtn = document.querySelector('.popup__button')

let currentName = document.querySelector('.profile__name');
let currentTitle = document.querySelector('.profile__title');

let formElement = document.querySelector('.popup__container')
let nameInput = formElement.querySelector('.popup__input[name="traveller-name"]');
let titleInput = formElement.querySelector('.popup__input[name="traveller-title"]');


function popupOpen () {
  popup.classList.toggle('popup_opened');
  nameInput.value = currentName.textContent;
  titleInput.value = currentTitle.textContent;
}

function popupClose () {
  popup.classList.toggle('popup_opened');
}

function popupCloseOnClickOverlay (event) {
  console.log(event.target, event.currentTarget);
  if (event.target !== event.currentTarget) {
    return;
  }
  
  popupClose();
}

function popupSubmit (evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value; 
  currentTitle.textContent = titleInput.value;
  popup.classList.remove('popup_opened');
}

editBtn.addEventListener('click', popupOpen);

closeBtn.addEventListener('click', popupClose);

formElement.addEventListener('submit', popupSubmit);

popup.addEventListener('click', popupCloseOnClickOverlay);