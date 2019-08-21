import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userAuthenticator = false;
  private _userId='abc';

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
