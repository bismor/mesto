
export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .cloneNode(true)
    return cardElement
  }


  _setOnDeleteClick = (evt) => {
    const target = evt.target
    const currentСard = target.closest('.mesto__element')
    currentСard.remove()
  }

  _setOnLikeClick = (evt) => {
    const target = evt.target
    target.classList.toggle("mesto__like-active")
  }

  _setOnOpenPicture = (evt) => {
    this._handleCardClick(evt)
  }

  _setEventListeners = () => {
    this._element.querySelector('.mesto__delete').addEventListener('click', this._setOnDeleteClick);
    this._element.querySelector('.mesto__like').addEventListener('click', this._setOnLikeClick)
    this._element.querySelector('.mesto__img').addEventListener('click', this._setOnOpenPicture)
  }

  render = () => {
    this._element = this._getTemplate()
    this._cardPict = this._element.querySelector('.mesto__img')
    this._cardPict.alt = this._name
    this._cardPict.src = this._link
    this._element.querySelector('.mesto__title').textContent = this._name;
    this._setEventListeners()
    return this._element;
  }

}
