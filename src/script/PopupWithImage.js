const popupOpenPict = document.querySelector('.imagePopup')
const popupPictCont = document.querySelector('.popup__picture')
const pictureName = popupPictCont.querySelector('.popup__subname')
const popupScreen = popupPictCont.querySelector('.popup__screen')

import Popup from "./Popup.js"
export default class PopupWithImage extends Popup {
  constructor() {
    super(popupOpenPict)
  }

  open (imagesrc, imagealt) {
    super.open()
    pictureName.textContent = imagealt;
    popupScreen.src = imagesrc
    popupScreen.alt = imagealt
    this.setEventListeners()

  }

  _handCloseButton = () => {
    super.close()
  }

  setEventListeners =  () => {
    this._selectorPopup.addEventListener('mousedown', this._handleOverlay)
    document.addEventListener('keydown', this._handleEscClose)
    this._selectorPopup.querySelector('.popup__close').addEventListener('mousedown', this._handCloseButton);
  }

}
