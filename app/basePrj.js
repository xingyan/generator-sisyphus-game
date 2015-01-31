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
       * @desc 生成基本的目录结构
       * @param newOptions
       */
      buildApp: function() {

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