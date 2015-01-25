'use strict';

var
    yeoman = require('yeoman-generator'),

    yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    this.option('test-framework', {
      desc: 'Test framework to be invoked',
      type: String,
      defaults: 'mocha'
    });

    this.option('skip-welcome-message', {
      desc: 'Skips the welcome message',
      type: Boolean
    });

    this.option('skip-install', {
      desc: 'Skips the installation of dependencies',
      type: Boolean
    });

    this.option('skip-install-message', {
      desc: 'Skips the message  after the installation of dependencies',
      type: Boolean
    });
    console.log('constructor');
  },

  initializing: function () {
    this.pkg = require('../package.json');
    console.log('initializing');
  },

  prompting: function () {
    var done = this.async();
    /*
    if (!this.options['skip-welcome-message']) {
      this.log(yosay('\'Allo \'allo! Out of the box I include HTML5 Boilerplate, jQuery, and a gulpfile.js to build your app.'));
    }
    */
    var prompts = [{
      type: 'checkbox',
      name: 'features',
      message: 'What more would you like?',
      choices: [{
        name: 'Sass',
        value: 'includeSass',
        checked: true
      }, {
        name: 'Bootstrap',
        value: 'includeBootstrap',
        checked: true
      }, {
        name: 'Modernizr',
        value: 'includeModernizr',
        checked: true
      }]
    }];

    this.prompt(prompts, function (answers) {
      var features = answers.features;

      var hasFeature = function (feat) {
        return features.indexOf(feat) !== -1;
      };

      // manually deal with the response, get back and store the results.
      // we change a bit this way of doing to automatically do this in the self.prompt() method.
      this.includeSass = hasFeature('includeSass');
      this.includeBootstrap = hasFeature('includeBootstrap');
      this.includeModernizr = hasFeature('includeModernizr');

      done();
    }.bind(this));
    console.log('prompting');
  },

  configuring: function() {
    console.log('configuring');
  },

  'default': function() {
    console.log('default');
  },

  writing: {
    gulpfile: function() {
      this.template('gulpfile.js');
    }
  },

  conflicts: function() {
    console.log('conflicts');
  },

  install: function() {
    console.log('install');
  },

  end: function() {
    console.log('end');
  }
});
