
export class FormValidator {
  constructor(selectors, isValid, formSection, errorElement) {
    this._selectors = selectors
    this._isValid = isValid
    this._formSection = formSection
    this._errorElement = errorElement
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _showInputError (errorElement, inputElement, errorMessage, selectors) {
    inputElement.classList.add(selectors.popupTextTypeError)
    errorElement.classList.add(selectors.formInputError)
    errorElement.textContent = errorMessage
  }

  _hideInputError (errorElement, inputElement, selectors) {
    inputElement.classList.remove(selectors.popupTextTypeError)
    errorElement.classList.remove(selectors.formInputError)
    errorElement.textContent = ''
  }

  _toggleButtonState  = (inputList, buttonElement, selectors) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute("disabled", true)
      buttonElement.classList.add(selectors.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute("disabled")
      buttonElement.classList.remove(selectors.inactiveButtonClass);
    }
  }

  _checkInputValidity (inputElement, selectors) {
    this._isValid = inputElement.validity.valid
    this._formSection = inputElement.closest(selectors.sectionSelector)
    this._errorElement = this._formSection.querySelector(selectors.inputErrorClass)

    if (this._isValid) {
      this._hideInputError(this._errorElement, inputElement, selectors)
    } else {
      this._showInputError(this._errorElement, inputElement, inputElement.validationMessage, selectors)
    }
  }

  _setEventListeners (formElement, selectors) {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector))
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);

    formElement.addEventListener('submit', (event) =>{
      event.preventDefault();
    })

    this._toggleButtonState (inputList, buttonElement, selectors)

    formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState (inputList, buttonElement, selectors)
      }, 0);
    });

    inputList.forEach(inputElement => {
      formElement.addEventListener('input', () =>{
        this._checkInputValidity(inputElement, selectors)
        this._toggleButtonState(inputList, buttonElement, selectors);
      })
    })
  }

  enableValidation = (selectors) => {
    this._formList = document.querySelectorAll(selectors.popupSelector)

    this._formList.forEach(formElement => {
      this._setEventListeners(formElement, selectors)
    })
  }
}
