import Popup from "./Popup.js"
export default class PopupWithForm extends Popup {
  constructor(selectorPopup, callBackSumbit) {
    super(selectorPopup)
    this._callBackSumbit = callBackSumbit
  }

  _getInputValues () {
    const inputList = {}
    const allInputs = this._selectorPopup.querySelectorAll('.popup__text')
    allInputs.forEach((input) => {
      inputList[input.name] = input.value
    })
    return inputList
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
