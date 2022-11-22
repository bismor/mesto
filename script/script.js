enableValidation(selectors)

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];

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
const closePopupProfile = profilePopup.querySelector('.popup__close')
const formElementProfilePopup = profilePopup.querySelector('.popup__form');
const closePopupcreateCard = cardPopup.querySelector('.popup__close')
const formElementCardPopup = cardPopup.querySelector('.popup__form');
const closePopupPict = popupOpenPict.querySelector('.popup__close')
const nameInput = profilePopup.querySelector('.popup__name')
const jobInput = profilePopup.querySelector('.popup__job')
const nameCardValue = cardPopup.querySelector('.popup__name')
const pictureCardValue = cardPopup.querySelector('.popup__job')
const cardPopupOverlay = document.querySelector('.cardPopup')
const profilePopupOverlay = document.querySelector('.profilePopup')
const imagePopupoverlay = document.querySelector('.imagePopup')

initialCards.forEach(element => {
  const mestoElement = createCard(element)
  mestoUl.append(mestoElement)
})

function createCard(item) {
  const cardElement = mestoTemplate.cloneNode(true);
  const cardPict = cardElement.querySelector('.mesto__img')
  cardPict.alt = item.name
  cardPict.src = item.link
  cardElement.querySelector('.mesto__title').textContent = item.name;
  setEventListener(cardElement)
  return cardElement
}

function setEventListener(evt) {
  const el = evt.querySelector('.mesto__delete')
  el.addEventListener('click', handlePostDelete)

  const like = evt.querySelector('.mesto__like')
  like.addEventListener('click', toggleLike)

  const picture = evt.querySelector('.mesto__img')
  picture.addEventListener('click', openPicture)
}

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
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = { name: nameCardValue.value, link: pictureCardValue.value }
  const mestoElement = createCard(newCard)
  mestoUl.prepend(mestoElement)
  nameCardValue.value = ''
  pictureCardValue.value = ''
  hideClosestPopup(evt)
}

buttonProfileOpenPopup.addEventListener('click', openPopupProfile);
buttonOpenCreateCardPopup.addEventListener('click', openPopupcreateCard);
closePopupProfile.addEventListener('click', hideClosestPopup)
closePopupcreateCard.addEventListener('click', hideClosestPopup)
closePopupPict.addEventListener('click', hideClosestPopup)
cardPopupOverlay.addEventListener('click', hideClosestPopup)
profilePopupOverlay.addEventListener('click', hideClosestPopupOverlay)
imagePopupoverlay.addEventListener('click', hideClosestPopupOverlay)

formElementCardPopup.addEventListener('submit', handleAddCardFormSubmit);
formElementProfilePopup.addEventListener('submit', handleProfileFormSubmit);
document.addEventListener('keydown', keyСlosePopup)

function keyСlosePopup(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened)
  }
}

function hideClosestPopupOverlay(element) {
  const target = element.target
  const targetPopup = target.closest(".popup");
  const popupContainer = targetPopup.querySelector('.popup__container');
  if (target.contains(popupContainer)) {
    closePopup(targetPopup);
  }
}
