
export class FormValidator {
  constructor(selectors, form) {
    this._selectors = selectors
    this._form = form
    this._buttonElement = form.querySelector(selectors.submitButtonSelector);
    this._inputList = Array.from(form.querySelectorAll(selectors.inputSelector))
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _showInputError (inputElement, errorMessage) {
    inputElement.classList.add(this._selectors.popupTextTypeError)
    this._errorElement.classList.add(this._selectors.formInputError)
    this._errorElement.textContent = errorMessage
  }

  _hideInputError (inputElement) {
    inputElement.classList.remove(this._selectors.popupTextTypeError)
    this._errorElement.classList.remove(this._selectors.formInputError)
    this._errorElement.textContent = ''
  }

  _toggleButtonState  = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute("disabled", true)
      this._buttonElement.classList.add(this._selectors.inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute("disabled")
      this._buttonElement.classList.remove(this._selectors.inactiveButtonClass);
    }
  }

  _checkInputValidity (inputElement) {
    this._isValid = inputElement.validity.valid
    this._formSection = inputElement.closest(this._selectors.sectionSelector)
    this._errorElement = this._formSection.querySelector(this._selectors.inputErrorClass)

    if (this._isValid) {
      this._hideInputError(inputElement)
    } else {
      this._showInputError(inputElement, inputElement.validationMessage)
    }
  }

  _setEventListeners () {
    const formElement = this._form


    this._toggleButtonState ()

    formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState ()
      }, 0);
    });

    this._inputList.forEach(inputElement => {
      formElement.addEventListener('input', () =>{
        this._checkInputValidity(inputElement)
        this._toggleButtonState();
      })
    })
  }

  enableValidation = () => {
    this._setEventListeners()
  }
}
