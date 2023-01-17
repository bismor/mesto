export default class Userinfo {
  constructor({userName, userinfo}){
    this._userName = document.querySelector(userName)
    this._userinfo = document.querySelector(userinfo)
  }

  getUserInfo() {
    //возвращает 1 обхект с двумя данными
    const profileInformation = {}
    profileInformation.popup__name = this._userName.textContent
    profileInformation.popup__job = this._userinfo.textContent
    return profileInformation
  }

  setUserInfo (profileData) {
    this._userName.textContent = profileData.popup__name;
    this._userinfo.textContent = profileData.popup__job;
  }
}
