import Popup from "./Popup.js"
export default class PopupWithForm extends Popup {
  constructor(selectorPopup, callBackSumbit) {
    super(selectorPopup)
    this._callBackSumbit = callBackSumbit
  }

  _getInputValues () {
    const InputList = {}
    const allForms = this._selectorPopup.querySelectorAll('.popup__text')
    allForms.forEach((input) => {
      InputList[input.name] = input.value
    })
    return InputList
  }

  _handleSumbit = (evt) => {
    evt.preventDefault()
    this._callBackSumbit(this._getInputValues())
    this.close()
  }

  _handleCloseButton = () => {
    this.close()
  }

  setEventListeners = () => {
    this._selectorPopup.addEventListener('mousedown', this._handleOverlay)
    document.addEventListener('keydown', this._handleEscClose)
    this._selectorPopup.addEventListener ('submit', this._handleSumbit)
    this._selectorPopup.querySelector('.popup__close').addEventListener('mousedown', this._handleCloseButton);
  }

  close () {
    super.close()
    this._selectorPopup.querySelector('.popup__form').reset()
  }
}
