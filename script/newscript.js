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
const popup = document.querySelector('.popup');
let mestoTemplate = document.querySelector('.mesto__template').content;
let mestoUl = document.querySelector('.mesto__ul');


function openPopup (popup) {
  popup.classList.add('_active');
}

initialCards.forEach(element => {
  let mestoElement = createCard(element)
  mestoUl.append(mestoElement)
})

function createCard (item) {
  const cardElement = mestoTemplate.cloneNode(true);
  let cardPict = cardElement.querySelector('.mesto__img')
  cardPict.alt = item.name
  cardPict.src = item.link
  cardElement.querySelector('.mesto__title').textContent = item.name;
  setEventListener (cardElement)
  return cardElement
}

function setEventListener (evt) {
  const el = evt.querySelector('.mesto__delete')
  el.addEventListener('click', deleteHandlerPost)

  const like = evt.querySelector('.mesto__like')
  like.addEventListener('click', removeLike)

  const picture = evt.querySelector('.mesto__img')
  picture.addEventListener('click', openPicture)
}

function deleteHandlerPost (evt) {
  const target = evt.target
  const currentСard = target.closest('.mesto__element')
  currentСard.remove()
}

function removeLike (evt) {
  const target = evt.target
  if (target.classList.contains("mesto__like")) {
    target.classList.toggle("mesto__like-active")
  } else {
    target.classList.toggle("mesto__like")
  }
}

function openPicture (evt)  {
  const target = evt.target
  popupOpenPict = document.querySelector('.imagePopup')
  popupOpenPict.classList.add('popup_opened');
  let popupPictCont = document.querySelector('.popup__picture')
  let pictureName = popupPictCont.querySelector('.popup__subname')
  let popupScreen = popupPictCont.querySelector('.popup__screen')
  pictureName.textContent = target.alt;
  popupScreen.src = target.src

  let closePopupPict = popupOpenPict.querySelector('.popup__close')
  closePopupPict.addEventListener('click', closePopup)
}

function closePopup (element) {
  let target = element.target
  let targetPopup = target.closest('.popup')
  targetPopup.classList.remove('popup_opened');
}
