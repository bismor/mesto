import Popup from "./Popup.js"
export default class PopupWithForm extends Popup {
  constructor(selectorPopup, callBackSumbit) {
    super(selectorPopup)
    this._callBackSumbit = callBackSumbit
    this._popupForm = this._popupElement.querySelector('.popup__form')
    this._handleSumbit = this._handleSumbit.bind(this);
    this._inputList = this._popupForm.querySelectorAll('.popup__text');
    this._popupButton = this._popupElement.querySelector('.popup__button')
  }

  _getInputValues () {
    const inputList = {}
    this._inputList.forEach((input) => {
      inputList[input.name] = input.value
    })
    return inputList
  }

  _handleSumbit (evt) {
    evt.preventDefault()
    this._popupButton.textContent = "Сохранение.."
    this._callBackSumbit(this._getInputValues())
  }

  close() {
    super.close()
    this._popupForm.reset()
  }

  resetNameSubmit () {
    this._popupButton.textContent = "Сохранить"
  }

  setEventListeners () {
    super.setEventListeners()
    this._popupForm.addEventListener ('submit', this._handleSumbit)
  }

  setFormValues (inputsData) {
    this._inputList.forEach((input) => {
      input.value = inputsData[input.name];
    })
  }

}
