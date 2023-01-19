import '../pages/index.css'
import  Card  from "../components/Card.js";
import { initialCardsData, validationConfig} from "../components/constant.js";
import {FormValidator} from '../components/FormValidator.js'
import Section from "../components/Section.js";
import Userinfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

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
const formProfileValidator = new FormValidator(validationConfig, profilePopup)
const formValidatorPicture = new FormValidator(validationConfig, cardPopup)
formProfileValidator.enableValidation()
formValidatorPicture.enableValidation()

const popupWithImage = new PopupWithImage ()
popupWithImage.setEventListeners()
const popupWithFormProfile = new PopupWithForm ('.profilePopup', handleProfileFormSubmit)
popupWithFormProfile.setEventListeners()
const popupWithFormCard = new PopupWithForm ('.cardPopup', handleAddCardFormSubmit)
popupWithFormCard.setEventListeners()


function getCard(item) {
  const card = new Card(item, '.mesto__template', (name, link) => {popupWithImage.open(link, name)})
  return card.render();
}

const cardList = new Section({
  items: initialCardsData,
  renderer: (cardData) => {
    const card = getCard(cardData);
    cardList.addItem(card);
  }
},
  '.mesto__ul'
)

cardList.renderItems()

function handleAddCardFormSubmit() {
  const card = getCard({name: nameCardValue.value, link: pictureCardValue.value});
  cardList.beforeaddItem(card);
}

const userInfo = new Userinfo ({

  userName: '.profile__title',
  userinfo: '.profile__subtitle'
})

function handleProfileFormSubmit(formvalue) {
  userInfo.setUserInfo(formvalue)
};

function openPopupProfile() {
  const profileInputsData = userInfo.getUserInfo()

  popupWithFormProfile.open()
  popupWithFormProfile.setFormValue(profileInputsData)
}

function openPopupcreateCard() {
  popupWithFormCard.open()
}

buttonProfileOpenPopup.addEventListener('click', openPopupProfile);
buttonOpenCreateCardPopup.addEventListener('click', openPopupcreateCard);

export {profileName, profileJob, nameInput, jobInput}


