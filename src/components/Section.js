export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  beforeaddItem(element) {
    this._container.prepend(element);
  }

  renderItems(cards, myUserID) {
    cards.forEach((card) => this._renderer(card, myUserID));
  }
}
