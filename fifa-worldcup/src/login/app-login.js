import { User } from '../models/User';
import { inject, NewInstance } from 'aurelia-dependency-injection';
import { AuthService } from '../backend/auth-service';

@inject(AuthService)
export class AppLogin {

  constructor( auth) {

    this.user = new User();

    /*this.signInValidator = signInController
    this.signInValidator.addRenderer(new MaterializeFormValidationRenderer())
    this.signInValidator.addObject(this.user, SignInRules)*/

    this.login = false;
    this.error = null;

    this.auth = auth;
  }

  signIn() {
    this.login = true;
    this.auth.signIn(this.user)
      .then(response => {
        this.onSignInSuccess(response)
      })
      .catch(err => {
        console.log(err)
        this.onSignInError(err)
      })
  }

  onSignInSuccess(result) {
    this.login = false
    this.auth.navigate("/#/matches")
  }

  onSignInError(result) {
    this.login = false
    this.error = "Authentication Failed. Validate your Username and Password."
  }
}
