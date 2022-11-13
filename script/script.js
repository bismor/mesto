let openPopup = document.querySelector('.profile__button');
let popup = document.querySelector('.popup');
let closePopup = popup.querySelector('.popup__close');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let formElement = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__name');
let jobInput = popup.querySelector('.popup__job');
const mestoTemplate = document.querySelector('.mesto__template').content;
const mestoUl = document.querySelector('.mesto__ul');
const popupContainer = popup.querySelector('.popup__container');
const buttonAddCardPopup = document.querySelector('.button')

formElement.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  clickClosePopup()
};

function clickOpenPopup () {
  popup.classList.add('active');
  let nameTitle = profileName.textContent
  let jobTitle = profileJob.textContent
  let containerID = document.getElementById('profile')
  containerID.style.display = 'flex';

  nameInput.value = nameTitle
  jobInput.value = jobTitle
  document.addEventListener('keydown', keyClosePopup);
};

function clickOpenaddCardPopup () {
  popup.classList.add('active');
  let containerID = document.getElementById('addcards')
  containerID.style.display = 'flex';
  console.log(popup)
  document.addEventListener('keydown', keyClosePopup);
}

function clickClosePopup (evt) {
  target = evt.target
  console.log(target)
  popup.classList.remove('active');
  popupContainer.display = 'none';
  nameInput.value = ''
  jobInput.value = ''
  document.removeEventListener('keydown', keyClosePopup)
};

function keyClosePopup (event) {
  if  (event.code == 'Escape') {
    clickClosePopup()
  }
}

closePopup.addEventListener('click',clickClosePopup);
openPopup.addEventListener('click', clickOpenPopup);
buttonAddCardPopup.addEventListener('click',clickOpenaddCardPopup);

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

const setEventListener = (mestoElement) => {
  const el = mestoElement.querySelector('.mesto__delete')
  el.addEventListener('click',deleteHandlerPost)

  const like = mestoElement.querySelector('.mesto__like')
  like.addEventListener('click', removeLike)
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




