import { cardNameInput, cardLinkInput } from './script.js'

export class FormValidator {
  constructor(settings, validationEl) {
    this._validationEl = validationEl;

    this._inputSelector = settings.inputSelector;
    this._inputList = Array.from(this._validationEl.querySelectorAll(this._inputSelector));
    this._submitButtonSelector = settings.submitButtonSelector;
    this._buttonElement = this._validationEl.querySelector(this._submitButtonSelector)
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._validationEl.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };
  
  _hideInputError = (inputElement) => {
    const errorElement = this._validationEl.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }; 

  _isValid (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }; 

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 

  toggleButtonState () {
    if ((this._hasInvalidInput(this._inputList)) || (((cardLinkInput.value === '') || (cardNameInput.value === '')))){
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', '');
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }; 


  _setEventListeners() {  
    this.toggleButtonState();
    
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.toggleButtonState();
        this._isValid(inputElement);
      });
      inputElement.addEventListener('keypress', (event) => {
        if ((event.key === "Enter") && (this._hasInvalidInput())) {
          event.preventDefault();
        };
      });
    });

    this._validationEl.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  }; 

  enableValidation() {
    this._setEventListeners();
  };
   
}