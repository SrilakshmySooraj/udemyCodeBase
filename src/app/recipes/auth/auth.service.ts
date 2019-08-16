import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userAuthenticator = false;

  constructor() { }

  get userAuth() {
    return this._userAuthenticator;
  }

  login() {
    this._userAuthenticator = true;
  }

  logout() {
    this._userAuthenticator = false;
  }
}
