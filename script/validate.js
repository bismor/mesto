
function checkInputValidity (inputElement, selectors) {
  const isValid = inputElement.validity.valid
  const formSection = inputElement.closest(selectors.sectionSelector)
  const errorElement = formSection.querySelector(selectors.inputErrorClass)

  if (isValid) {
    hideInputError(errorElement, inputElement, selectors)
  } else {
    showInputError(errorElement, inputElement, inputElement.validationMessage, selectors)
  }
}

function showInputError (errorElement, inputElement, errorMessage, selectors) {
  inputElement.classList.add(selectors.popupTextTypeError)
  errorElement.classList.add(selectors.formInputError)
  errorElement.textContent = errorMessage
}

function hideInputError (errorElement, inputElement, selectors) {
  inputElement.classList.remove(selectors.popupTextTypeError)
  errorElement.classList.remove(selectors.formInputError)
  errorElement.textContent = ''
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState  = (inputList, buttonElement, selectors) => {
  console.log(hasInvalidInput(inputList))
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", true)
    buttonElement.classList.add(selectors.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled")
    buttonElement.classList.remove(selectors.inactiveButtonClass);
  }
}

function setEventListeners (formElement, selectors) {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector))
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);

  formElement.addEventListener('submit', (event) =>{
    event.preventDefault();
  })

  toggleButtonState (inputList, buttonElement, selectors)

  inputList.forEach(inputElement => {

    toggleButtonState(inputList, buttonElement, selectors);

    formElement.addEventListener('input', () =>{
      checkInputValidity(inputElement, selectors)
      toggleButtonState(inputList, buttonElement, selectors);
    })
  })
}

function enableValidation (selectors) {
  const formList = document.querySelectorAll(selectors.popupSelector)

  formList.forEach(formElement => {
    setEventListeners(formElement, selectors)
  })
}

const selectors = {
  popupSelector: '.popupValidation',
  sectionSelector: '.popup__section',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: '.popup__input-error',
  errorClass: '.popup__button_inactive',
  popupTextTypeError: 'popup__text-type-error',
  formInputError: 'popup__input-error_active'
};
