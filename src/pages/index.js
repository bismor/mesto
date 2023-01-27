import "../pages/index.css";
import Api from "../components/Api.js";
import PopupWithApproval from "../components/PopupWithApproval";
import Card from "../components/Card.js";
import { validationConfig } from "../components/constant.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Userinfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";


const cardPopup = document.querySelector(".cardPopup");
const profilePopup = document.querySelector(".profilePopup");
const changeAvatar = document.querySelector(".changeAvatar")
const openChangeprofileAvatar = document.querySelector(".profile__buttonpict");
const profileAvatar = document.querySelector(".profile__avatar");
const buttonProfileOpenPopup = document.querySelector(".profile__button");
const buttonOpenCreateCardPopup = document.querySelector(".button");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const nameInput = profilePopup.querySelector(".popup__name");
const jobInput = profilePopup.querySelector(".popup__job");
const nameCardValue = cardPopup.querySelector(".popup__name");
const avatarPopup = document.querySelector(".changeAvatar");
const avatarInput = avatarPopup.querySelector('.popup__job');
const pictureCardValue = cardPopup.querySelector(".popup__job");
const formProfileValidator = new FormValidator(validationConfig, profilePopup);
const formValidatorPicture = new FormValidator(validationConfig, cardPopup);
const formChangeAvatarValidator = new FormValidator(validationConfig, changeAvatar);
formProfileValidator.enableValidation();
formValidatorPicture.enableValidation();
formChangeAvatarValidator.enableValidation();

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
  handleChangeAvatar
);
popupWithChangeAvatar.setEventListeners();

const popupWithApprovalDeleteCard = new PopupWithApproval(
  ".deleteCardPopup",
  handleDeleteCard
);
popupWithApprovalDeleteCard.setEventListeners();

const api = new Api();

function setProfile() {
  api.getProfileInformation()
  .then((data) => {
    profileName.textContent = data.name;
    profileJob.textContent = data.about;
    profileAvatar.src = data.avatar;
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

}
setProfile();

const cardsInformation = []

function getElementTemplate(item) {
  const card = new Card(
    item,
    ".mesto__template",
    (name, link) => {popupWithImage.open(link, name)},
    () => {popupWithApprovalDeleteCard.open(); popupWithApprovalDeleteCard.setFormValues({payload: item._id})},
    (id) => {handleAddLikeCard(id)},
    (id) => {handleRemoveLikeCard(id)},
  );
  cardsInformation.push(card)
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
);

api.getInitialCards()
.then((data) => {
  const cardsInfo = [];
  data.forEach((input) => {
    const cardInput = {};
    cardInput["name"] = input.name;
    cardInput["link"] = input.link;
    cardInput["_id"] = input._id;
    cardInput["likes"] = input.likes;
    cardInput["owner"] = input.owner._id;
    cardsInfo.push(cardInput);
  })
  cardList.renderItems(cardsInfo);
})
.catch((err) => {
  console.log(err); // выведем ошибку в консоль
});

function handleAddCardFormSubmit() {
  const name = nameCardValue.value
  const link = pictureCardValue.value
  api
  .addCard({name, link})
  .then((res) => {
    if (res.ok) {
      popupWithFormCard.close()
      return res.json()
    }
  })
  .then((data) => {
    data = {...data, likes: data.likes, owner: data.owner._id}
    const card = getElementTemplate(data);
    cardList.beforeaddItem(card)
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
}

const userInfo = new Userinfo({
  userName: ".profile__title",
  userinfo: ".profile__subtitle",
});

function handleProfileFormSubmit(formvalue) {
  api
  .changeProfileInfo(formvalue)
  .then ((res) => {
    if (res.ok) {
      popupWithFormProfile.close()
      userInfo.setUserInfo(formvalue);
    }
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
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

function handleChangeAvatar() {
  const avatar = avatarInput.value
  api
  .changeProfileAvatar(avatar)
  profileAvatar.src = avatar
}

function handleDeleteCard(id) {
  api
  .deleteCardServer(id)
  .then ((res) => {
    if (res.ok) {
      popupWithApprovalDeleteCard.close()
      // popupWithApprovalDeleteCard.deleteCardForm()
    }
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
}

function handleAddLikeCard(id) {
  api.addLikeCard(id)
  .then((data) => {
    const card =  cardsInformation.find(item => item._id === id)
    card.setLike(data.likes)
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
}

function handleRemoveLikeCard(id) {
  api.removeLikeCard(id)
  .then((data) => {
    const card =  cardsInformation.find(item => item._id === id)
    card.setLike(data.likes)
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
}

buttonProfileOpenPopup.addEventListener("click", openPopupProfile);
buttonOpenCreateCardPopup.addEventListener("click", openPopupcreateCard);
openChangeprofileAvatar.addEventListener("click", openChangeAvatar);

