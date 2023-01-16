export class FormValidator {
  constructor(settings, validationEl) {
    this._validationEl = validationEl;

    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  _showInputError = (formEl, inputElement, errorMessage) => {
    const errorElement = formEl.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };
  
  _hideInputError = (formEl, inputElement) => {
    const errorElement = formEl.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }; 

  _isValid (formEl, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formEl, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formEl, inputElement);
    }
  }; 

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 

  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }; 


  _setEventListeners() {
    const formEl = this._validationEl;
    const inputList = Array.from(formEl.querySelectorAll(this._inputSelector));
    const buttonElement = formEl.querySelector(this._submitButtonSelector);
    
    this._toggleButtonState(inputList, buttonElement);
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState(inputList, buttonElement);
        this._isValid(formEl, inputElement);
      });
      inputElement.addEventListener('keypress', (event) => {
        if ((event.key === "Enter") && (this._hasInvalidInput(inputList))) {
          event.preventDefault();
        };
      });
    });

    formEl.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  }; 

  enableValidation() {
    this._setEventListeners();
  };
   
}