class Card {
  static _template = document.querySelector('.mesto__template').content;
  constructor() {

  }

  setOnDeleteClick = (cb) => {
    this._onDeleteClick = cb
  }

  setOnLikeClick = (cb) => {
    this._onLikeClick = cb
  }

  setOnOpenPicture = (cb) => {
    this._onOpenPicture = cb
  }

  _setEventListeners = () => {
    this._cardElement.querySelector('.mesto__delete').addEventListener('click',  this._onDeleteClick);
    this._cardElement.querySelector('.mesto__like').addEventListener('click', this._onLikeClick)
    this._cardElement.querySelector('.mesto__img').addEventListener('click', this._onOpenPicture)
  }

  render = (cardData) => {
    this._cardElement = Card._template.cloneNode(true).children[0];
    this._cardPict = this._cardElement.querySelector('.mesto__img')
    this._cardPict.alt = cardData.name
    this._cardPict.src = cardData.link
    this._cardElement.querySelector('.mesto__title').textContent = cardData.name;
    this._setEventListeners(this._cardElement)
  }

}

export {Card}
