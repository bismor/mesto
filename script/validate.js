const formProfile = document.querySelector('.profilePopup')
const inputListProfile = Array.from(formProfile.querySelectorAll('.popup__text'))

const formCard = document.querySelector('.cardPopup')
const inputListCard = Array.from(formCard.querySelectorAll('.popup__text'))

function checkInputValidity (inputElement) {
  const isValid = inputElement.validity.valid
  const formSection = inputElement.closest('.popup__section')
  const errorElement = formSection.querySelector('.form__input-error')

  if (isValid) {
    hideInputError(errorElement, inputElement, inputElement.validationMessage)
  } else {
    showInputError(errorElement, inputElement, inputElement.validationMessage)
  }
}

function showInputError (errorElement, inputElement, errorMessage) {
  inputElement.classList.add('popup__text-type-error')
  errorElement.classList.add('form__input-error_active')
  errorElement.textContent = errorMessage
}

function hideInputError (errorElement, inputElement) {
  inputElement.classList.remove('popup__text-type-error')
  errorElement.classList.remove('form__input-error_active')
  errorElement.textContent = ''
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState  = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", true)
    buttonElement.classList.add('popup__button_inactive');
  } else {
    buttonElement.removeAttribute("disabled")
    buttonElement.classList.remove('popup__button_inactive');
  }
}

inputListProfile.forEach(inputElement => {
  const buttonElement = formProfile.querySelector('.popup__button');
  toggleButtonState(inputListProfile, buttonElement);

  inputElement.addEventListener('input', () =>{
    checkInputValidity(inputElement)
    toggleButtonState(inputListProfile, buttonElement);
  })
})

inputListCard.forEach(inputElement => {
  const buttonElement = formCard.querySelector('.popup__button');

  toggleButtonState(inputListCard, buttonElement);

  inputElement.addEventListener('input', () =>{
    checkInputValidity(inputElement)
    toggleButtonState(inputListCard, buttonElement);
  })
})




