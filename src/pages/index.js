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
const changeAvatar = document.querySelector(".changeAvatar");
const openChangeprofileAvatar = document.querySelector(".profile__buttonpict");
const profileAvatar = document.querySelector(".profile__avatar");
const buttonProfileOpenPopup = document.querySelector(".profile__button");
const buttonOpenCreateCardPopup = document.querySelector(".button");
const nameCardValue = cardPopup.querySelector(".popup__name");
const avatarPopup = document.querySelector(".changeAvatar");
const avatarInput = avatarPopup.querySelector(".popup__job");
const pictureCardValue = cardPopup.querySelector(".popup__job");
const formProfileValidator = new FormValidator(validationConfig, profilePopup);
const formValidatorPicture = new FormValidator(validationConfig, cardPopup);
const formChangeAvatarValidator = new FormValidator(
  validationConfig,
  changeAvatar
);
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

const cardList = new Section((cardData, myUserID) => {
  const card = getElementTemplate(cardData, myUserID);
  cardList.addItem(card);
}, ".mesto__ul");

function main() {
  Promise.all([api.getInitialCards(), api.getProfileInformation()])
    .then((data) => {
      const [cards, user] = data;
      userInfo.setUserInfo(user);
      userInfo.setUserAvatar(user.avatar);

      cardList.renderItems(cards, user._id);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
}
main();

function getElementTemplate(item, myUserID) {
  const card = new Card(
    item,
    ".mesto__template",
    (name, link) => {
      popupWithImage.open(link, name);
    },
    (callBack) => {
      popupWithApprovalDeleteCard.open(item._id, callBack);
    },
    handleAddLikeCard,
    handleRemoveLikeCard,
    myUserID
  );
  return card.render();
}

function handleAddCardFormSubmit() {
  const name = nameCardValue.value;
  const link = pictureCardValue.value;
  api
    .addCard({ name, link })
    .then((data) => {
      const card = getElementTemplate(data, data.owner._id);
      cardList.beforeaddItem(card);
      popupWithFormCard.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupWithFormCard.resetNameSubmit()
    });
}

const userInfo = new Userinfo({
  userName: ".profile__title",
  userinfo: ".profile__subtitle",
  useravatar: ".profile__avatar",
});

function handleProfileFormSubmit(formvalue) {
  api
    .changeProfileInfo(formvalue)
    .then(() => {
      popupWithFormProfile.close();
      userInfo.setUserInfo(formvalue);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupWithFormProfile.resetNameSubmit()
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
  const avatar = avatarInput.value;
  api.changeProfileAvatar(avatar).then(() => {
    popupWithChangeAvatar.close();
    profileAvatar.src = avatar;
  })
  .finally(() => {
    popupWithChangeAvatar.resetNameSubmit()
  });
}

function handleDeleteCard(id, onSuccssesCallBack) {
  api
    .deleteCardServer(id)
    .then(() => {
      onSuccssesCallBack()
      popupWithApprovalDeleteCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithApprovalDeleteCard.resetNameSubmit()
    });
}

function handleAddLikeCard(id, onSuccsses) {
  api
    .addLikeCard(id)
    .then((data) => {
      onSuccsses(data.likes);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
}

function handleRemoveLikeCard(id, onSuccsses) {
  api
    .removeLikeCard(id)
    .then((data) => {
      onSuccsses(data.likes);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
}

buttonProfileOpenPopup.addEventListener("click", openPopupProfile);
buttonOpenCreateCardPopup.addEventListener("click", openPopupcreateCard);
openChangeprofileAvatar.addEventListener("click", openChangeAvatar);
