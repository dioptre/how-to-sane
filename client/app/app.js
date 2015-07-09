/* jshint unused: false */
import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';
import Route from './overrides/route';

var App;

Ember.MODEL_FACTORY_INJECTIONS = true;
//Ember.ENV.RAISE_ON_DEPRECATION = true;
App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
