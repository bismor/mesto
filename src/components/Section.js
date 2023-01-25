export default class Section {
  constructor({ items, renderer }, containerSelector, api) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._api = api;
  }

  addItem(element) {
    this._container.append(element);
  }

  _saveItem = (element) => {
    this._api.addCard({}).then((data) => this.beforeaddItem);
  };

  beforeaddItem(element) {
    this._container.prepend(element);
  }

  renderItems(cardData) {
    if (cardData != undefined) {
      this._items = cardData;
    }
    this._items.forEach(this._renderer);
  }
}
