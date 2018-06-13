export class App {

  configureRouter(config, router) {
    this.router = router;
    config.title = 'FIFA WC 2018';
    config.map([
      {route: ['', 'home'], name: 'home', moduleId: 'home/app-home', title: 'Home'},
      {route: ['login'], name: 'login', moduleId: 'login/app-login', title: 'Login'},
      {route: ['join'], name: 'join', moduleId: 'join/app-join', title: 'Join'},
      { route: ['matches'],       name: 'matches',       moduleId: 'admin/match/match-list' }
    ]);
  }

}
