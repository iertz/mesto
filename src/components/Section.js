export class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItem() {
    this._renderer(this._item); ;
  }

  prependItem(cardElement) {
    this._container.prepend(cardElement);
  }
}