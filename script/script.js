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
  clickClosePopup()
};

function clickOpenPopup () {
  popup.classList.add('active');
  let nameTitle = profileName.textContent
  let jobTitle = profileJob.textContent

  nameInput.value = nameTitle
  jobInput.value = jobTitle
  document.addEventListener('keydown', keyClosePopup);
};

function clickClosePopup () {
  popup.classList.remove('active');
  nameInput.value = ''
  jobInput.value = ''
  document.removeEventListener('keydown', keyClosePopup)
};

function keyClosePopup (event) {
  if  (event.code == 'Escape') {
    clickClosePopup()
  }
}


closePopup.addEventListener('click',clickClosePopup);
openPopup.addEventListener('click', clickOpenPopup);
