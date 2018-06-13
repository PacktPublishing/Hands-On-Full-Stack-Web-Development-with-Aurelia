import {inject} from 'aurelia-framework'
import {Router} from 'aurelia-router'
import { AuthService } from "../../backend/auth-service";

@inject(Router, AuthService)
export class AppHeader {

  constructor(router, auth) {
    this.router = router;
    this.auth = auth;
    this.loggedIn = this.auth.getUserToken();
  }

  logout() {
    this.auth.logout();
    this.auth.navigate("/#/login")
  }

}
