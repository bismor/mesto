import  Card  from "./Card.js";
import { initialCardsData, selectors } from "./constant.js";
import {FormValidator} from './FormValidator.js'
import Section from "./Section.js";
import Userinfo from "./UserInfo.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";

const mestoUl = document.querySelector('.mesto__ul');
const cardPopup = document.querySelector('.cardPopup')
const profilePopup = document.querySelector('.profilePopup')
const buttonProfileOpenPopup = document.querySelector('.profile__button')
const buttonOpenCreateCardPopup = document.querySelector('.button')
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const nameInput = profilePopup.querySelector('.popup__name')
const jobInput = profilePopup.querySelector('.popup__job')
const nameCardValue = cardPopup.querySelector('.popup__name')
const pictureCardValue = cardPopup.querySelector('.popup__job')
const formProfileValidator = new FormValidator(selectors, profilePopup)
const formValidatorPicture = new FormValidator(selectors, cardPopup)
formProfileValidator.enableValidation()
formValidatorPicture.enableValidation()

const popupWithImage = new PopupWithImage ()

const cardList = new Section({
  items: initialCardsData,
  renderer: (item) => {
    const card = new Card(item, '.mesto__template', function (clickEvent) {popupWithImage.openPopup(clickEvent.target.src, clickEvent.target.alt)})
    const addCard = card.render()
    cardList.addItem(addCard)
  }
},
  mestoUl
)

cardList.renderItems()

function handleAddCardFormSubmit() {
  //создать новую карточку, вставить туда данные новой карточки, отрисовать новую карточку
  const newCardData = {name: nameCardValue.value, link: pictureCardValue.value}
  const card = new Card(newCardData, '.mesto__template', function (clickEvent) {popupWithImage.openPopup(clickEvent.target.src, clickEvent.target.alt)})
  const renderCard = card.render()
  mestoUl.prepend(renderCard)
}

const userInfo = new Userinfo ({
  userName: '.popup__name',
  userinfo: '.popup__job'
})

function handleProfileFormSubmit(formvalue) {
  userInfo.setUserInfo(formvalue)
};

function openPopupProfile() {
  userInfo.getUserInfo()
  const popupWithForm = new PopupWithForm (profilePopup, handleProfileFormSubmit)
  popupWithForm.openPopup()
  popupWithForm.setEventListeners()
}

function openPopupcreateCard() {
  const popupWithForm = new PopupWithForm (cardPopup, handleAddCardFormSubmit)
  popupWithForm.openPopup()
  popupWithForm.setEventListeners()
}

buttonProfileOpenPopup.addEventListener('click', openPopupProfile);
buttonOpenCreateCardPopup.addEventListener('click', openPopupcreateCard);

export {profileName, profileJob, nameInput, jobInput}


