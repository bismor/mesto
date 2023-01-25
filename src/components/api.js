export default class Api {
  constructor() {
    this._authorization = "2c0e8e40-9bc8-4cbb-b338-6dd82b568a54";
  }

  getInitialCards() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-57/cards ", {
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      return res.json();
    });
  }

  getProfileInformation() {
    return fetch("https://nomoreparties.co/v1/cohort-57/users/me ", {
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      return res.json();
    });
  }

  addCard(data) {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-57/cards ", {
      headers: {
        authorization: this._authorization,
      }
    }).then((res)=> {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Произошла ошибка")
    })
  }
  // другие методы работы с API
}
