export default class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup;
  }

  open() {
    this._selectorPopup.classList.add('popup_opened');
  }

  close() {
    this._selectorPopup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose)
    this._selectorPopup.removeEventListener('mousedown', this._handleOverlay)
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

  setEventListeners = () => {
    // навешивает слушатель события при нажатии на блок с попапом, колбек должен
    // закрыть форму при клике по заднему фону
    this._selectorPopup.addEventListener('mousedown', this._handleOverlay)
    document.addEventListener('keydown', this._handleEscClose)
  }
}

