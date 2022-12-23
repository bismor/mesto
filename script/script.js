import { Card } from "./Card.js";
import { initialCardsData, selectors } from "./mock-data.js";
import {FormValidator} from './FormValidator.js'


const mestoUl = document.querySelector('.mesto__ul');
const cardPopup = document.querySelector('.cardPopup')
const profilePopup = document.querySelector('.profilePopup')
const buttonProfileOpenPopup = document.querySelector('.profile__button')
const buttonOpenCreateCardPopup = document.querySelector('.button')
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formElementProfilePopup = profilePopup.querySelector('.popup__form');
const formElementCardPopup = cardPopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__name')
const jobInput = profilePopup.querySelector('.popup__job')
const nameCardValue = cardPopup.querySelector('.popup__name')
const pictureCardValue = cardPopup.querySelector('.popup__job')
const closeButtons = document.querySelectorAll('.popup__close');


const formValidator = new FormValidator()
formValidator.enableValidation(selectors)

initialCardsData.forEach(element => {
  const card = new Card(element, '.mesto__template')
  const addCard = card.render()
  mestoUl.append(addCard)
})


function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardData = {name: nameCardValue.value, link: pictureCardValue.value}
  const card = new Card(newCardData, '.mesto__template')
  const addCard = card.render()
  mestoUl.prepend(addCard)
  evt.target.reset()
  hideClosestPopup(evt)
}

// function setEventListener(card) {
//   card.setOnDeleteClick(handlePostDelete)
//   card.setOnLikeClick(toggleLike)
//   card.setOnOpenPicture(openPicture)
// }

// function handlePostDelete(evt) {
//   const target = evt.target
//   const currentСard = target.closest('.mesto__element')
//   currentСard.remove()
// }

// function toggleLike(evt) {
//   const target = evt.target
//   target.classList.toggle("mesto__like-active")
// }

// function openPicture(evt) {
//   const target = evt.target
//   openPopup(popupOpenPict)
//   pictureName.textContent = target.alt;
//   popupScreen.src = target.src
//   popupScreen.alt = target.alt

// }

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyСlosePopup)
  popup.removeEventListener('mousedown', hideClosestPopupOverlay)
}


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyСlosePopup)
  popup.addEventListener('mousedown', hideClosestPopupOverlay)
}

function hideClosestPopup(element) {
  const targetPopup = element.target.closest(".popup");
  if (targetPopup) {
    closePopup(targetPopup);
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const target = evt.target
  const nameInput = target.querySelector('.popup__name')
  const jobInput = target.querySelector('.popup__job')
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  hideClosestPopup(evt)
};

function openPopupProfile() {
  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
  openPopup(profilePopup)
}

function openPopupcreateCard() {
  openPopup(cardPopup)
}

buttonProfileOpenPopup.addEventListener('click', openPopupProfile);
buttonOpenCreateCardPopup.addEventListener('click', openPopupcreateCard);
formElementCardPopup.addEventListener('submit', handleAddCardFormSubmit);
formElementProfilePopup.addEventListener('submit', handleProfileFormSubmit);


function keyСlosePopup(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened)
  }
}

function hideClosestPopupOverlay(element) {
  const target = element.target
  if (target.classList.contains('popup_opened')) {
    closePopup(target);
  }
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

export {openPopup}
