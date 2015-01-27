/**
 * @desc sr的项目配置生成
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
   * @desc SR js类
   * @type {Function}
   */
  SrPrj = util.define(BasePrj, {

    /**
     * @desc constructor
     */
    initialize: function() {
      BasePrj.prototype.initialize.apply(this, arguments);
      this.staticResourceList = [{
        name: 'Underscore',
        value: 'includeUnderscore',
        checked: true
      }];
    },

    CLASS_NAME: 'SrPrj'
  }),

  /**
   * @desc 单例
   */
  srPrj = module.exports = (!srPrj ? new SrPrj() : srPrj);


