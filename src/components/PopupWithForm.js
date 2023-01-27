import Popup from "./Popup.js"
export default class PopupWithForm extends Popup {
  constructor(selectorPopup, callBackSumbit) {
    super(selectorPopup)
    this._callBackSumbit = callBackSumbit
    this._popupForm = this._popupElement.querySelector('.popup__form')
    this._handleSumbit = this._handleSumbit.bind(this);
  }

  _getInputValues () {
    const inputList = {}
    const allInputs = this._popupElement.querySelectorAll('.popup__text')
    allInputs.forEach((input) => {
      inputList[input.name] = input.value
    })
    return inputList
  }

  _handleSumbit (evt) {
    evt.preventDefault()
    this._popupElement.querySelector('.popup__button').textContent = "Подождите.."
    this._callBackSumbit(this._getInputValues())
  }

  close() {
    super.close()
    this._popupForm.reset()
    this._popupElement.querySelector('.popup__button').textContent = "Сохранить"
  }

  setEventListeners () {
    super.setEventListeners()
    this._popupForm.addEventListener ('submit', this._handleSumbit)
  }

  setFormValues (inputsData) {
    const allInputs = this._popupElement.querySelectorAll('.popup__text')
    allInputs.forEach((input) => {
      input.value = inputsData[input.name];
    })
  }

}
