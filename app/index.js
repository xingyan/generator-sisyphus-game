'use strict';

var
    yeoman = require('yeoman-generator'),

    inquirer = require('inquirer'),

    _ = require('lodash'),

    sisUtil = require('../bin/util/util'),

    q = require('q');

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
  },

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();
    var configList = [{
      name: 'SeaJs_Project',
      value: 'seajsPrj'
    }, {
      name: 'Require_Project',
      value: 'requirePrj'
    }, {
      name: 'SacredRelic_Project',
      value: 'sacredrelicPrj'
    }, {
      name: 'Angular_Project',
      value: 'angularPrj'
    }];
    var prompts =
      [{
        type: 'list',
        name: 'features',
        message: 'What project type would you like?',
        choices: _.flatten([
          new inquirer.Separator('Choose a project template'),
          new inquirer.Separator(),
          configList,
          new inquirer.Separator()
        ])
      }];
    this.prompt(prompts, function (answers) {
      var features = answers.features;
      this.prjTypeConfig = require('./prj/' + features);
      this.prjTypeConfig.setInstance(this);
      done();
    }.bind(this));
  },

  configCssPreprocessor: function() {
    if(!this.prjTypeConfig) return;
    var defaultConfig = [{
      name: 'Less',
      value: 'includeLess',
      checked: true
    }];
    this.prjTypeConfig.configuringPrompt({
      type: 'checkbox',
      name: 'features',
      message: 'What CSS preprocessor would you like?',
      choices: defaultConfig
    });
  },

  configTemplate: function() {
    if(!this.prjTypeConfig) return;
    var defaultConfig = [{
      name: 'Underscore',
      value: 'includeUnderscore'
    }, {
      name: 'HandlerBar',
      value: 'includeHandlerBar'
    }];
    this.prjTypeConfig.configuringPrompt({
      type: 'list',
      name: 'features',
      message: 'What FE template would you like?',
      choices: defaultConfig
    });
  },

  configStaticResource: function() {
    if(!this.prjTypeConfig || this.prjTypeConfig.defaultResourceList.length == 0)  return;
    this.prjTypeConfig.configuringPrompt({
      type: 'checkbox',
      name: 'features',
      message: 'What more would you like?',
      choices: this.prjTypeConfig.defaultResourceList
    });
  },

  'default': function() {
    //console.log('default');
  },

  writing: {
    gulpfile: function() {
      this.prjTypeConfig.initGulp && this.prjTypeConfig.initGulp();
    },
    packageJSON: function() {
      this.prjTypeConfig.initPackageJSON && this.prjTypeConfig.initPackageJSON();
    },
    mainStylesheet: function () {
      this.prjTypeConfig.mainStylesheet && this.prjTypeConfig.mainStylesheet();
    },
    app: function () {
      this.prjTypeConfig.buildApp && this.prjTypeConfig.buildApp();
    },
    writeIndex: function() {
      this.prjTypeConfig.writeIndex && this.prjTypeConfig.writeIndex();
    },

    npmpackage: function() {
    //  console.log("leishen's package here");
    }
  },

  conflicts: function() {
  //  console.log('conflicts');
  },

  install: function() {
    this.installDependencies({
      bower: false
    });
  },

  end: function() {
  //  console.log('end');
  }
});
