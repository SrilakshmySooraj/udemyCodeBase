import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userAuthenticator = true;
  private _userId='xys';

  constructor() { }

  get userAuth() {
    return this._userAuthenticator;
  }

  get userId(){
    return this._userId;
  }

  login() {
    this._userAuthenticator = true;
  }

  logout() {
    this._userAuthenticator = false;
  }
}
