const editBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.uikit-close');
const submitBtn = document.querySelector('.popup__button')

let currentName = document.querySelector('.profile__name');
let currentTitle = document.querySelector('.profile__title');

let nameInput = document.querySelector('.popup__input[name="traveller-name"]');
let titleInput = document.querySelector('.popup__input[name="traveller-title"]');




console.log(currentName);


function popupOpen () {
  popup.classList.add('popup_opened');
  nameInput.value = currentName.textContent;
  titleInput.value = currentTitle.textContent;
}

function popupClose () {
  popup.classList.remove('popup_opened');
}

function popupSubmit (evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value; 
  currentTitle.textContent = titleInput.value;
  popup.classList.remove('popup_opened');
}

editBtn.addEventListener('click', popupOpen);

closeBtn.addEventListener('click', popupClose);

submitBtn.addEventListener('click', popupSubmit);