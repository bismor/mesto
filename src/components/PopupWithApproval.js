import Popup from "./Popup.js"

export default class PopupWithApproval extends Popup {
  constructor(selectorPopup, CallBackSumbit) {
    super(selectorPopup)
    this._callBackSumbit = CallBackSumbit
    this._popupForm = this._popupElement.querySelector('.popup__form')
    this._handleSumbit = this._handleSumbit.bind(this);
    this._popupButton = this._popupElement.querySelector('.popup__button')
    this._cardID =  this._popupButton.id
  }

  _handleSumbit (evt) {
    evt.preventDefault()
    this._popupButton.textContent = "Сохранение.."
    this._callBackSumbit(this._cardID, this._callBack)
  }

  resetNameSubmit () {
    this._popupButton.textContent = "Да"
    this._callBack = null
    this._cardID = ""
  }

  open (IdCard, callBack) {
    this._callBack = callBack
    super.open()
    this._cardID = IdCard
  }

  close() {
    super.close()
    this._popupForm.reset()
  }

  setEventListeners () {
    super.setEventListeners()
    this._popupForm.addEventListener("submit", this._handleSumbit)
  }
}


