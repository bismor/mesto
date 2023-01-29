export default class Card {
  #owner;
  #userId;
  constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleAddLikeCard, handleRemoveLikeCard, myUserID) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._cardPict = this._element.querySelector('.mesto__img');
    this._likeScore = this._element.querySelector('.like__score');
    this.#owner = data.owner._id;
    this.#userId = myUserID;
    this._handleDeleteClick = handleDeleteClick;
    this._handleAddLikeCard = handleAddLikeCard;
    this._handleRemoveLikeCard = handleRemoveLikeCard;
    this._cardSection = this._element.querySelector(".mesto__element");
    this._likeButton = this._element.querySelector(".mesto__like")
    this._mestoDelte = this._element.querySelector('.mesto__delete')
    this.setLikes(data.likes)
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .cloneNode(true)
    return cardElement
  }

  _setOpenApprovalDelete = () => {
    this._handleDeleteClick()
  }

  _updateLikes = () => {
    if (this._checkFindUserByID(this._likes, this.#userId)){
      this._likeButton.classList.add("mesto__like-active");
    } else {
      this._likeButton.classList.remove("mesto__like-active");
    }
    this._likeScore.textContent = this._likes.length
  }

  _checkFindUserByID = (arr, id) => {
    return arr.find((el) => el._id === id)
  }

  _changeLikeClick = () => {
    if (this._checkFindUserByID(this._likes, this.#userId)){
      this._handleRemoveLikeCard(this._id, this.setLikes)
    } else {
      this._handleAddLikeCard(this._id, this.setLikes)
    }
  }

  _setOnOpenPicture = () => {
    this._handleCardClick(this._link, this._name)
  }

  setEventListeners () {
    if (this.#owner === this.#userId) {
      this._mestoDelte.addEventListener('click', this._setOpenApprovalDelete);
    }
    this._likeButton.addEventListener('click', this._changeLikeClick)
    this._cardPict.addEventListener('click', this._setOnOpenPicture)
  }

  deleteCardFromDom () {
    this._cardSection.remove()
  }

  setLikes = (value) => {
    this._likes = value
    this._updateLikes()
  }

  render = () => {
    this._cardPict.alt = this._name
    this._cardPict.src = this._link
    this._cardSection.id = this._id
    this._likeScore.textContent = this._likes.length
    this._element.querySelector('.mesto__title').textContent = this._name;
    if (this.#owner !== this.#userId) {
      this._mestoDelte.remove()
    }
    this.setEventListeners()
    return this._element;
  }

}
