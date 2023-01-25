export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate()
    this._cardPict = this._element.querySelector('.mesto__img')
    this._likeScore = this._element.querySelector('.like__score')
    this._userId = "d29b7f6e26540a674e4f7173"
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .cloneNode(true)
    return cardElement
  }


  _setOnDeleteClick = () => {
    this._element.remove()
  }

  _setOnLikeClick = (evt) => {
    const target = evt.target
    target.classList.toggle("mesto__like-active")
  }

  _setOnOpenPicture = () => {
    this._handleCardClick(this._link, this._name)
  }

  setEventListeners () {
    if (this._cardPict.id !== this._userId) {
      this._element.querySelector('.mesto__delete').addEventListener('click', this._setOnDeleteClick);
    }
    this._element.querySelector('.mesto__like').addEventListener('click', this._setOnLikeClick)
    this._cardPict.addEventListener('click', this._setOnOpenPicture)
  }

  render = () => {
    this._cardPict.alt = this._name
    this._cardPict.src = this._link
    this._cardPict.id = this._id
    this._likeScore.textContent = this._likes
    this._element.querySelector('.mesto__title').textContent = this._name;
    this.setEventListeners()
    return this._element;
  }

}
