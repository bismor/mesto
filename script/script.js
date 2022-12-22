import {enableValidation, selectors} from "./validate.js"
import { Card } from "./Card.js";
import { initialCardsData } from "./mock-data.js";

enableValidation(selectors)


const buttonProfilePopup = document.querySelector('.profile__pencil')
const mestoTemplate = document.querySelector('.mesto__template').content;
const mestoUl = document.querySelector('.mesto__ul');
const cardPopup = document.querySelector('.cardPopup')
const profilePopup = document.querySelector('.profilePopup')
const buttonProfileOpenPopup = document.querySelector('.profile__button')
const buttonOpenCreateCardPopup = document.querySelector('.button')
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const popupOpenPict = document.querySelector('.imagePopup')
const popupPictCont = document.querySelector('.popup__picture')
const pictureName = popupPictCont.querySelector('.popup__subname')
const popupScreen = popupPictCont.querySelector('.popup__screen')
const formElementProfilePopup = profilePopup.querySelector('.popup__form');
const formElementCardPopup = cardPopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__name')
const jobInput = profilePopup.querySelector('.popup__job')
const nameCardValue = cardPopup.querySelector('.popup__name')
const pictureCardValue = cardPopup.querySelector('.popup__job')
const cardPopupOverlay = document.querySelector('.cardPopup')
const profilePopupOverlay = document.querySelector('.profilePopup')
const imagePopupoverlay = document.querySelector('.imagePopup')
const closeButtons = document.querySelectorAll('.popup__close');




initialCardsData.forEach(element => {
  const card = new Card()
  card.setOnDeleteClick(handlePostDelete)
  card.setOnLikeClick(toggleLike)
  card.setOnOpenPicture(openPicture)

  card.render(element, mestoUl)
})


// function createCard(item) {
//   const cardElement = mestoTemplate.cloneNode(true);
//   const cardPict = cardElement.querySelector('.mesto__img')
//   cardPict.alt = item.name
//   cardPict.src = item.link
//   cardElement.querySelector('.mesto__title').textContent = item.name;
//   setEventListener(cardElement)
//   return cardElement
// }

// function setEventListener(evt) {
//   const el = evt.querySelector('.mesto__delete')
//   el.addEventListener('click', handlePostDelete)

//   const like = evt.querySelector('.mesto__like')
//   like.addEventListener('click', toggleLike)

//   const picture = evt.querySelector('.mesto__img')
//   picture.addEventListener('click', openPicture)
// }

function handlePostDelete(evt) {
  const target = evt.target
  const currentСard = target.closest('.mesto__element')
  currentСard.remove()
}

function toggleLike(evt) {
  const target = evt.target
  target.classList.toggle("mesto__like-active")
}

function openPicture(evt) {
  const target = evt.target
  openPopup(popupOpenPict)
  pictureName.textContent = target.alt;
  popupScreen.src = target.src
  popupScreen.alt = target.alt

}

function hideClosestPopup(element) {
  const targetPopup = element.target.closest(".popup");
  if (targetPopup) {
    closePopup(targetPopup);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyСlosePopup)
  popup.removeEventListener('mousedown', hideClosestPopupOverlay)
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

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyСlosePopup)
  popup.addEventListener('mousedown', hideClosestPopupOverlay)
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {name: nameCardValue.value, link: pictureCardValue.value}
  const mestoElement = createCard(newCard)
  mestoUl.prepend(mestoElement)
  evt.target.reset()
  hideClosestPopup(evt)
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
