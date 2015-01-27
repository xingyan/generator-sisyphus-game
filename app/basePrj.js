'use strict';

var
    /**
     * @desc 工具包
     */
    util = require('../bin/util/util'),

    BasePrj = util.define('BasePrjGenerator', {

      /**
       * @desc yeoman生成器的单例
       */
      ins: null,

      /**
       * @desc 静态资源列表
       * @param opts
       */
      staticResourceList: null,

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
       * @desc 初始化使用的所有的静态资源库
       * @param features
       */
      initResourceList: function(features) {
        console.log(features);
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