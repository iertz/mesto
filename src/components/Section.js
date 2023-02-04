export class Section {
  constructor({ item, renderer }, selector) {
    this._item = item;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItem() {
    this._renderer(this._item); ;
  }

  appendItem(cardElement) {
    this._container.append(cardElement);
  }

  prependItem(cardElement) {
    this._container.prepend(cardElement);
  }
}