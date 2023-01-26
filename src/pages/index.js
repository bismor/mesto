import "../pages/index.css";
import Api from "../components/api";
import Card from "../components/Card.js";
import { validationConfig } from "../components/constant.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Userinfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

const mestoUl = document.querySelector(".mesto__ul");
const cardPopup = document.querySelector(".cardPopup");
const profilePopup = document.querySelector(".profilePopup");
const profileAvatarButton = document.querySelector(".profile__buttonpict");
const profileAvatar = document.querySelector(".profile__avatar");
const buttonProfileOpenPopup = document.querySelector(".profile__button");
const buttonOpenCreateCardPopup = document.querySelector(".button");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const nameInput = profilePopup.querySelector(".popup__name");
const jobInput = profilePopup.querySelector(".popup__job");
const nameCardValue = cardPopup.querySelector(".popup__name");
const pictureCardValue = cardPopup.querySelector(".popup__job");
const formProfileValidator = new FormValidator(validationConfig, profilePopup);
const formValidatorPicture = new FormValidator(validationConfig, cardPopup);
formProfileValidator.enableValidation();
formValidatorPicture.enableValidation();

const popupWithImage = new PopupWithImage(".imagePopup");
popupWithImage.setEventListeners();
const popupWithFormProfile = new PopupWithForm(
  ".profilePopup",
  handleProfileFormSubmit
);
popupWithFormProfile.setEventListeners();
const popupWithFormCard = new PopupWithForm(
  ".cardPopup",
  handleAddCardFormSubmit
);
popupWithFormCard.setEventListeners();
const popupWithChangeAvatar = new PopupWithForm(
  ".changeAvatar",
  handleAddCardFormSubmit
);
popupWithChangeAvatar.setEventListeners();

const api = new Api();

const getProfile = api.getProfileInformation();
function setProfile() {
  getProfile.then((data) => {
    profileName.textContent = data.name;
    profileJob.textContent = data.about;
    profileAvatar.src = data.avatar;
  });
}
setProfile();

function getElementTemplate(item) {
  const card = new Card(item, ".mesto__template", (name, link) => {
    popupWithImage.open(link, name);
  });
  return card.render();
}

const cardList = new Section(
  {
    items: [],
    renderer: (cardData) => {
      const card = getElementTemplate(cardData);
      cardList.addItem(card);
    },
  },
  ".mesto__ul",
  api
);

const getCards = api.getInitialCards();
getCards.then((data) => {
  const cardsInfo = [];
  data.forEach((input) => {
    const cardInput = {};
    cardInput["name"] = input.name;
    cardInput["link"] = input.link;
    cardInput["_id"] = input._id;
    cardInput["likes"] = input.likes.length;

    cardsInfo.push(cardInput);
  });
  cardList.renderItems(cardsInfo);
});

function handleAddCardFormSubmit() {
  const name = nameCardValue.value
  const link = pictureCardValue.value
  api
    .addCard({name, link})
    .then((data) => {
      data = {...data, likes: data.likes.length}
      const card = getElementTemplate(data);
      cardList.beforeaddItem(card)})
    .catch((err)=> console.log(err));
}

const userInfo = new Userinfo({
  userName: ".profile__title",
  userinfo: ".profile__subtitle",
});

function handleProfileFormSubmit(formvalue) {
  api
  .changeProfile(formvalue)
  userInfo.setUserInfo(formvalue);
}

function openPopupProfile() {
  const profileInputsData = userInfo.getUserInfo();

  popupWithFormProfile.open();
  popupWithFormProfile.setFormValues(profileInputsData);
}

function openPopupcreateCard() {
  popupWithFormCard.open();
}

function openChangeAvatar() {
  popupWithChangeAvatar.open();
}

buttonProfileOpenPopup.addEventListener("click", openPopupProfile);
buttonOpenCreateCardPopup.addEventListener("click", openPopupcreateCard);
profileAvatarButton.addEventListener("click", openChangeAvatar);

export { profileName, profileJob, nameInput, jobInput };
