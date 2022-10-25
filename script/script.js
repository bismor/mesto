let openPopup = document.querySelector('.profile__button');
let Popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close');
let ProfileName = document.querySelector('.profile__title');
let ProfileJob = document.querySelector('.profile__subtitle');

let formElement = Popup.querySelector('.popup__button');
console.log(formElement)
let nameInput = Popup.querySelector('.popup__name');
let jobInput = Popup.querySelector('.popup__job');


function formSubmitHandler (evt) {
  evt.preventDefault();

  ProfileName.textContent = nameInput.value;
  ProfileJob.textContent = jobInput.value
  console.log(ProfileName)
  console.log(ProfileJob)
}

formElement.addEventListener('submit', formSubmitHandler);

function ClickOpenPopup () {
  Popup.classList.add('active');
};

function ClickclosePopup () {
  Popup.classList.remove('active');
};

closePopup.addEventListener('click',ClickclosePopup);
openPopup.addEventListener('click', ClickOpenPopup);

