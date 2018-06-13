import environment from './environment';

export function configure(aurelia) {
  aurelia.use
    .plugin('aurelia-materialize-bridge', b => b.useAll().preventWavesAttach())
    .standardConfiguration()
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
