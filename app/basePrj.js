'use strict';

var
    /**
     * @desc 工具包
     */
    util = require('../bin/util/util'),

    /**
     * @desc lodash
     */
    _ = require('lodash'),

    /**
     * @desc 基础类
     */
    BasePrj = util.define('BasePrjGenerator', {

      /**
       * @desc 文件夹root目录
       */
      root: '',

      /**
       * @desc yeoman生成器的单例
       */
      ins: null,

      /**
       * @desc 静态资源列表
       * @param opts
       */
      defaultResourceList: null,

      /**
       * @desc constructor
       */
      initialize: function(opts) {
        this.addOptions(opts);
      },

      /**
       * @desc 弹窗
       */
      configuringPrompt: function(config) {
        if(!this.ins) return false;
        var done = this.ins.async();
        var prompts = [{
          type: config.type,
          name: config.name,
          message: config.message,
          choices: config.choices
        }];
        var that = this;
        this.ins.prompt(prompts, function(answers) {
          var features = answers.features;
          that.reportResult(config.choices, features);
          done();
        });
      },

      /**
       * @desc 根据选择的结果初始化属性
       */
      reportResult: function(ars, features) {
        var that = this;
        _.each(ars, function(item) {
          var v = item.value,
              r = false;
          if((typeof features).toLowerCase() == 'string') {
            r = (features.indexOf(v) !== -1);
          } else {
            r = (_.indexOf(features, v) !== -1);
          }
          that[v] = r;
          that.ins[v] = r;
        });
      },

      /**
       * @desc 生成基本的目录结构
       * @param newOptions
       */
      buildApp: function() {

      },

      /**
       * @desc 初始化样式表相关
       * @returns {boolean}
       */
      mainStylesheet: function() {

      },

      /**
       * @desc 生成首页html
       */
      writeIndex: function() {
        if(!this.ins) return false;
        this.ins.indexFile = this.ins.src.read(this.root + 'index.html');
        this.ins.indexFile = this.ins.engine(this.ins.indexFile, this.ins);
        return true;
      },

      /**
       * @desc 处理gulp相关
       */
      initGulp: function() {
        this.ins && this.ins.template(this.root + 'gulpfile.js', 'gulpfile.js');
      },

      /**
       * @desc 处理packageJSON相关
       */
      initPackageJSON: function() {
        this.ins && this.ins.template(this.root + '_package.json', 'package.json');
      },

      /**
       * @desc 初始化使用的所有的静态资源库
       * @param features
       */
      initResourceList: function(features) {
        this.defaultResourceList = features;
        var that = this;
        _.forEach(this.defaultResourceList, function(v, k) {
          that.ins[v] = true;
          that[v] = true;
        });
      },

      /**
       * @private
       * @method addOptions
       * @param newOptions  -   {Object}
       */
      addOptions: function(newOptions) {
        if (this.options == null) {
          this.options = {};
        }
        util.extend(this.options, newOptions);
        util.extend(this, newOptions);
      },

      /**
       * @desc 给一个实例
       */
      setInstance: function(instance) {
        if(!instance || this.ins == instance)  return;
        this.ins = instance;
      },

      CLASS_NAME: 'BasePrjGenerator'
    });

module.exports = BasePrj;