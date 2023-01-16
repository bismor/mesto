export default class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup;
  }

  openPopup() {
    this._selectorPopup.classList.add('popup_opened');
  }

  closePopup() {
    this._selectorPopup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose)
    this._selectorPopup.removeEventListener('mousedown', this._handleOverlay)
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup()
    }
  }

  _handleOverlay = (evt) => {
    const target = evt.target
    if (target.classList.contains('popup_opened')) {
      this.closePopup();
    }
  }

  setEventListeners = () => {
    // навешивает слушатель события при нажатии на блок с попапом, колбек должен
    // закрыть форму при клике по заднему фону
    this._selectorPopup.addEventListener('mousedown', this._handleOverlay)
    document.addEventListener('keydown', this._handleEscClose)
  }
}

