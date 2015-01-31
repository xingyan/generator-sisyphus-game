/**
 * @desc requirejs的项目配置生成
 */
'use strict';

var
  /**
   * @desc 工具包
   */
  util = require('../../bin/util/util'),

  /**
   * @desc 基本类包
   */
  BasePrj = require('../basePrj'),

  /**
   * @desc RequirePrj js类
   * @type {Function}
   */
  RequirePrj = util.define(BasePrj, {

    /**
     * @desc constructor
     */
    initialize: function() {
      BasePrj.prototype.initialize.apply(this, arguments);
      this.defaultResourceList = [{
        name: 'Underscore',
        value: 'includeUnderscore',
        checked: true
      }];
    },

    CLASS_NAME: 'RequirePrj'
  }),

  /**
   * @desc 单例
   */
  requirePrj = module.exports = (!requirePrj ? new RequirePrj() : requirePrj);


