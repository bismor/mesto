import Popup from "./Popup.js"

export default class PopupWithApproval extends Popup {
  constructor(selectorPopup, CallBackSumbit) {
    super(selectorPopup)
    this._callBackSumbit = CallBackSumbit
    this._popupForm = this._popupElement.querySelector('.popup__form')
    this._handleSumbit = this._handleSumbit.bind(this);
    this._popupButton = this._popupElement.querySelector('.popup__button')
  }

  _getInputValues () {
    const inputValue = this._popupElement.querySelector('.popup__text').value
    return inputValue
  }

  _handleSumbit (evt) {
    evt.preventDefault()
    this._popupButton.textContent = "Подождите.."
    this._callBackSumbit(this._getInputValues())
  }

  resetNameSubmit () {
    this._popupButton.textContent = "Да"
  }

  close() {
    super.close()
    this._popupForm.reset()
  }

  setEventListeners () {
    super.setEventListeners()
    this._popupForm.addEventListener("submit", this._handleSumbit)
  }

  setFormValues (inputsData) {
    const allInputs = this._popupElement.querySelector('.popup__text')
    allInputs.value = inputsData[allInputs.name]
  }

}


