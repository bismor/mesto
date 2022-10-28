let openPopup = document.querySelector('.profile__button');
let popup = document.querySelector('.popup');
let closePopup = popup.querySelector('.popup__close');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let formElement = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__name');
let jobInput = popup.querySelector('.popup__job');

formElement.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  clickclosePopup()
};

function clickOpenPopup () {
  popup.classList.add('active');
};

function clickclosePopup () {
  popup.classList.remove('active');
};

closePopup.addEventListener('click',clickclosePopup);
openPopup.addEventListener('click', clickOpenPopup);

