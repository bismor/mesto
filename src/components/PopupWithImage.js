import Popup from "./Popup.js"
export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup)
    this._popupPictCont = this._popupElement.querySelector('.popup__picture')
    this._pictureName = this._popupPictCont.querySelector('.popup__subname')
    this._popupScreen = this._popupPictCont.querySelector('.popup__screen')
  }

  open (imagealt, imagesrc) {
    super.open()
    this._pictureName.textContent = imagealt;
    this._popupScreen.src = imagesrc
    this._popupScreen.alt = imagealt
  }

  close () {
    super.close()
    this._popupScreen.src = null
    this._popupScreen.alt = null
  }

}
