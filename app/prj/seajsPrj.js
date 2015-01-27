/**
 * @desc seajs的项目配置生成
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
   * @desc Seajs类
   * @type {Function}
   */
  SeaJsPrj = util.define(BasePrj, {

    /**
     * @desc constructor
     */
    initialize: function() {
      BasePrj.prototype.initialize.apply(this, arguments);
      this.staticResourceList = [{
        name: 'Underscore',
        value: 'includeUnderscore',
        checked: true
      }, {
        name: 'HandlerBar',
        value: 'includeHandlerBar',
        checked: true
      }];
    },

    CLASS_NAME: 'SeaJsPrj'
  }),

  /**
   * @desc 单例
   */
  seajsPrj = module.exports = (!seajsPrj ? new SeaJsPrj() : seajsPrj);
