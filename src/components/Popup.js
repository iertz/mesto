export class Popup {
  constructor(popupSelector) {
    this._item = document.querySelector(popupSelector);
  }

  open() {
    this._item.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt)
    });
  }; 

  close() {
    this._item.classList.remove('popup_opened');
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt)
    });
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  setEventListeners() {
    this._item.addEventListener('mousedown', (evt) => {
      if ((evt.target.classList.contains('popup_opened')) || (evt.target.classList.contains('popup__close-svg'))) {
        this.close();
      };  
    });
  };
}