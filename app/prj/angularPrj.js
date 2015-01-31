/**
 * @desc angular的项目配置生成
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
  AngularPrj = util.define(BasePrj, {

    /**
     * @desc constructor
     */
    initialize: function() {
      BasePrj.prototype.initialize.apply(this, arguments);
      this.defaultResourceList = [];
    },

    CLASS_NAME: 'AngularPrj'
  }),

  /**
   * @desc 单例
   */
  angularPrj = module.exports = (!angularPrj ? new AngularPrj() : angularPrj);


