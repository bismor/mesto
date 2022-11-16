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
  const closePopupPict = popupOpenPict.querySelector('.popup__close')
  closePopupPict.addEventListener('click', hideClosestPopup)
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
  const nameInput = profilePopup.querySelector('.popup__name')
  const jobInput = profilePopup.querySelector('.popup__job')
  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
  openPopup(profilePopup)
}

function openPopupcreateCard() {
  const nameInput = cardPopup.querySelector('.popup__name')
  const jobInput = cardPopup.querySelector('.popup__job')
  nameInput.value = ''
  jobInput.value = ''
  openPopup(cardPopup)
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const mestoImage = mestoTemplate.querySelector('.mesto__img')
  const target = evt.target
  const nameValue = target.querySelector('.popup__name');
  const pictureValue = target.querySelector('.popup__job');
  mestoImage.alt = nameValue.value
  mestoImage.src = pictureValue.value
  mestoTemplate.querySelector('.mesto__title').textContent = nameValue.value;
  setEventListener(mestoTemplate)
  mestoUl.prepend(mestoTemplate)
  hideClosestPopup(evt)
}

buttonProfileOpenPopup.addEventListener('click', openPopupProfile);
buttonOpenCreateCardPopup.addEventListener('click', openPopupcreateCard);
closePopupProfile.addEventListener('click', hideClosestPopup)
closePopupcreateCard.addEventListener('click', hideClosestPopup)
formElementCardPopup.addEventListener('submit', handleAddCardFormSubmit);
formElementProfilePopup.addEventListener('submit', handleProfileFormSubmit);
