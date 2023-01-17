import Popup from "./Popup.js"
export default class PopupWithImage extends Popup {
  constructor() {
    super('.imagePopup')
    this._popupPictCont = document.querySelector('.popup__picture')
    this._pictureName = this._popupPictCont.querySelector('.popup__subname')
    this._popupScreen = this._popupPictCont.querySelector('.popup__screen')
  }

  open (imagesrc, imagealt) {
    super.open()
    this._pictureName.textContent = imagealt;
    this._popupScreen.src = imagesrc
    this._popupScreen.alt = imagealt
  }

}
