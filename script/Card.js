import {openPopup} from './script.js'

const popupOpenPict = document.querySelector('.imagePopup')
const popupPictCont = document.querySelector('.popup__picture')
const pictureName = popupPictCont.querySelector('.popup__subname')
const popupScreen = popupPictCont.querySelector('.popup__screen')

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
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
    const target = evt.target
    openPopup(popupOpenPict)
    pictureName.textContent = target.alt;
    popupScreen.src = target.src
    popupScreen.alt = target.alt
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
    return this._element
  }

}
