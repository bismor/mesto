export default class Userinfo {
  constructor({userName, userinfo, useravatar}){
    this._userName = document.querySelector(userName)
    this._userInfo = document.querySelector(userinfo)
    this._userAvatar =  document.querySelector(useravatar)

  }

  getUserInfo() {
    //возвращает 1 обхект с двумя данными
    const profileInformation = {}
    profileInformation.name = this._userName.textContent
    profileInformation.about = this._userInfo.textContent

    return profileInformation
  }

  setUserInfo (profileData) {
    this._userName.textContent = profileData.name;
    this._userInfo.textContent = profileData.about;
  }

  //Метод находится отдельно, т.к. описание может меняться отдельно от аватара
  setUserAvatar (avatar) {
    this._userAvatar.src = avatar
  }

}
