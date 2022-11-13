let openPopup = document.querySelector('.profile__button');
let popup = document.querySelector('.popup');
let closePopup = popup.querySelector('.popup__close');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let nameInput = popup.querySelector('.popup__name');
let jobInput = popup.querySelector('.popup__job');
const mestoTemplate = document.querySelector('.mesto__template').content;
const mestoUl = document.querySelector('.mesto__ul');
let popupContainer = popup.querySelector('.popup__container');
const buttonAddCardPopup = document.querySelector('.button')


function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  clickClosePopup()
};


function clickOpenPopup (element) {
  const target = element.target
  popup.classList.add('active');
  if (target.classList == 'profile__pencil') {
    let nameTitle = profileName.textContent
    let jobTitle = profileJob.textContent
    let popupContainerID = document.getElementById('profile')
    popupContainerID.style.display = 'flex';
    nameInput.value = nameTitle
    jobInput.value = jobTitle
    document.addEventListener('keydown', keyClosePopup);
    let evt = document.querySelector('#profile')
    setEventListenerPopup(evt)
  } else {
    popup.classList.add('active');
    let popupContainerID = document.getElementById('addcards')
    popupContainerID.style.display = 'flex';
    popupContainerID.style.alignItems = 'flex-start';
    document.addEventListener('keydown', keyClosePopup);
    let evt = document.querySelector('#addcards')
    setEventListenerPopup(evt)
  }
};

const addcardsPopup = (evt) => {
  evt.preventDefault();
  const mestoElement = mestoTemplate.cloneNode(true);
  const mestoImage = mestoElement.querySelector('.mesto__img')
  target = evt.target
  const nameValue = target.querySelector('.popup__name');
  const pictureValue = target.querySelector('.popup__job');
  mestoImage.alt = nameValue.value
  mestoImage.src = pictureValue.value
  mestoElement.querySelector('.mesto__title').textContent = nameValue.value;
  setEventListener(mestoElement)
  mestoUl.prepend(mestoElement)
  clickClosePopup()
}

const setEventListenerPopup = (evt) => {
  let closePopup = evt.querySelector('.popup__close')
  closePopup.addEventListener('click',clickClosePopup);

  let popupContainer = evt.querySelector('.popup__button')
  let target = popupContainer.id
  if (target == 'saveprofile') {
    let formElement = evt.querySelector('.popup__form');
    formElement.addEventListener('submit', formSubmitHandler);
  } else {
    let formElement = evt.querySelector('.popup__form');
    formElement.addEventListener('submit', addcardsPopup);
  }
}


function clickClosePopup (element) {
  target = element.target
  let popupContainer = target.closest('.popup__container')
  popup.classList.remove('active');
  popupContainer.style.display = 'none';
  nameInput.value = ''
  jobInput.value = ''
  document.removeEventListener('keydown', keyClosePopup)
};

function keyClosePopup (event) {
  if  (event.code == 'Escape') {
    clickClosePopup()
  }
}

openPopup.addEventListener('click', clickOpenPopup);
buttonAddCardPopup.addEventListener('click',clickOpenPopup);

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


const deleteHandlerPost = (evt) => {
  const target = evt.target
  const currentСard = target.closest('.mesto__element')
  currentСard.remove()
}

const removeLike = (evt) => {
  const target = evt.target
  if (target.classList.contains("mesto__like")) {
    target.classList.toggle("mesto__like-active")
  } else {
    target.classList.toggle("mesto__like")
  }
}

const openPicture = (evt) => {
  const target = evt.target
  console.log('картинка')
  console.log(target.alt)
  popup.classList.add('active');
  let popupPictCont = document.querySelector('.popup__picture')
  let pictureName = popupPictCont.querySelector('.picture__name')
  let popupScreen = popupPictCont.querySelector('.popup__screen')
  console.log(pictureName)
  popupPictCont.style.display = 'flex';
  pictureName.textContent = target.alt;
  popupScreen.src = target.src
}

const setEventListener = (mestoElement) => {
  const el = mestoElement.querySelector('.mesto__delete')
  el.addEventListener('click',deleteHandlerPost)

  const like = mestoElement.querySelector('.mesto__like')
  like.addEventListener('click', removeLike)

  const picture = mestoElement.querySelector('.mesto__img')
  picture.addEventListener('click', openPicture)
}

initialCards.forEach(element => {
  const mestoElement = mestoTemplate.cloneNode(true);
  const mestoImage = mestoElement.querySelector('.mesto__img')
  mestoImage.alt = element.name
  mestoImage.src = element.link
  mestoElement.querySelector('.mesto__title').textContent = element.name;
  setEventListener(mestoElement)
  mestoUl.append(mestoElement)
})




