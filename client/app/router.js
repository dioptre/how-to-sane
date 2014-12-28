import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
    this.resource('posts', function() {
        this.route('post', {
            path: ':post_id'
        });

        this.route('create', {
            path: 'create'
        });
    });

    this.resource('templates', function() {
        this.route('template', {
            path: ':template_id'
        });

        this.route('create', {
            path: 'create'
        });
    });

    this.route('media', function() {
        this.route('upload', {
            path: 'upload'
        });
    });
  this.resource('albums', function() { });
  this.resource('photos', function() { });
});

export default Router;
