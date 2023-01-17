export default class Popup {
  constructor(selectorPopup) {
    this._popupElement = document.querySelector(selectorPopup);
    this.close = this.close.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  _handleOverlay = (evt) => {
    const target = evt.target
    if (target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  setEventListeners ()  {
    // навешивает слушатель события при нажатии на блок с попапом, колбек должен
    // закрыть форму при клике по заднему фону
    this._popupElement.addEventListener('mousedown', this._handleOverlay)
    this._popupElement.querySelector('.popup__close').addEventListener('mousedown', this.close);
  }
}

