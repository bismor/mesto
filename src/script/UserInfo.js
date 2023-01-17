import {profileName,profileJob, nameInput, jobInput} from "../pages/index.js"
export default class Userinfo {
  constructor({userName, userinfo}){
    this._userName = userName
    this._userinfo = userinfo
  }

  getUserInfo() {
    nameInput.value = profileName.textContent
    jobInput.value = profileJob.textContent
  }

  setUserInfo (evt) {
    profileName.textContent = evt.popup__name;
    profileJob.textContent = evt.popup__job;
  }
}
