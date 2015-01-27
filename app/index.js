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
  },

  initializing: function () {
    this.pkg = require('../package.json');
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

  configStaticResource: function() {
    var done = this.async();
    var defaultConfig = [{
      name: 'JQuery',
      value: 'includeJQuery',
      checked: true
    }];
    var prompts = [{
      type: 'checkbox',
      name: 'features',
      message: 'What more would you like?',
      choices: _.flatten([
        defaultConfig,
        this.prjTypeConfig.staticResourceList
      ])
    }];
    this.prompt(prompts, function(answers) {
      var features = answers.features;
      this.prjTypeConfig.initResourceList(features);
      done();
    }.bind(this));
  },

  configuring: function() {
  //  this.prjTypeConfig.configuring(arguments);
  },

  'default': function() {
    console.log('default');
  },

  writing: {
    gulpfile: function() {
    //  this.template('gulpfile.js');
    },
    app: function () {
    //  this.prjTypeConfig.buildApp();
      /*
      this.mkdir('app');
      this.mkdir('app/scripts');
      this.mkdir('app/styles');
      this.mkdir('app/images');
      this.mkdir('app/fonts');
      //this.copy('main.js', 'app/scripts/main.js');
      */
    },
    npmpackage: function() {
    //  console.log("leishen's package here");
    }
  },

  conflicts: function() {
  //  console.log('conflicts');
  },

  install: function() {
  //  console.log('install');
  },

  end: function() {
  //  console.log('end');
  }
});
