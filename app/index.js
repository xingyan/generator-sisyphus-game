'use strict';

var
    yeoman = require('yeoman-generator'),

    inquirer = require('inquirer'),

    _ = require('lodash');

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
    var configList = [{
      name: 'SeaJs_Project',
      value: 'seajsPrj',
      checked: true
    }, {
      name: 'Require_Project',
      value: 'requirePrj',
      checked: false
    }, {
      name: 'SacredRelic_Project',
      value: 'sacredrelicPrj',
      checked: false
    }, {
      name: 'Angular_Project',
      value: 'angularPrj',
      checked: false
    }];
    var prompts =
      [{
      type: 'list',
      name: 'features',
      message: 'What more would you like?',
      choices: _.flatten([
        new inquirer.Separator('Choose a project template'),
        new inquirer.Separator(),
        configList,
        new inquirer.Separator()
      ])
    }];

    this.prompt(prompts, function (answers) {
      console.log(answers);
      var features = answers.features;
      this.prjType = features;
      //暂时容错
      this.includeSass = false;
      done();
    }.bind(this));
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
    },
    app: function () {
      this.mkdir('app');
      this.mkdir('app/scripts');
      this.mkdir('app/styles');
      this.mkdir('app/images');
      this.mkdir('app/fonts');
      //this.copy('main.js', 'app/scripts/main.js');
    },
    npmpackage: function() {
      console.log("leishen's package here");
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
