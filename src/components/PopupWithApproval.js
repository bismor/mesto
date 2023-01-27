import Popup from "./Popup.js"

export default class PopupWithApproval extends Popup {
  constructor(selectorPopup, CallBackSumbit) {
    super(selectorPopup)
    this._callBackSumbit = CallBackSumbit
    this._handleSumbit = this._handleSumbit.bind(this);
    this._popupForm = this._popupElement.querySelector('.popup__form')
    this._handleSumbit = this._handleSumbit.bind(this);
  }

  _handleSumbit (evt) {
    evt.preventDefault()
    this._callBackSumbit()
    super.close()
    this._popupForm.reset()
    this._popupElement.querySelector('.popup__button').textContent = "Сохранить"
  }

  setEventListeners () {
    super.setEventListeners()
    this._popupForm.addEventListener("submit", this._handleSumbit)
  }

  setFormValues (inputsData) {
    const allInputs = this._popupElement.querySelectorAll('.popup__text')
    inputsData[allInputs.name];
  }

}
