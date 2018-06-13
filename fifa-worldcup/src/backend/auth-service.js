import env from '../environment';
import { AureliaCookie } from 'aurelia-cookie';
import { checkStatus, parseJSON } from './utils/HttpUtils';

export class AuthService {

  TOKEN_KEY = "T0k3n";

  constructor() {
    this.user = null;
  }

  signIn(user) {
    return fetch(`${env.backendApi}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(checkStatus)
      .then(token => {
        AureliaCookie.set(this.TOKEN_KEY, token, {
          expiry: 3,
          domain: '',
          secure: false });
        return token
      })
  }

  signUp(user) {
    user.privileges = ['normal'];
    return fetch(`${env.backendApi}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(checkStatus)
      .then(result => {
        console.log(result)
        return result
      })
  }

  logout() {
    AureliaCookie.delete(this.TOKEN_KEY);
  }

  navigate(url) {
    window.location.href = url
    window.location.reload()
  }

  getUserToken() {
    return AureliaCookie.get(this.TOKEN_KEY);
  }

}
