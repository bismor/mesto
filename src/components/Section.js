export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  beforeaddItem(element) {
    this._container.prepend(element);
  }

  renderItems(cardsData) {
    if (cardsData != undefined) {
      this._items = cardsData;
    }
    console.log(cardsData)
    this._items.forEach(this._renderer);
  }
}
