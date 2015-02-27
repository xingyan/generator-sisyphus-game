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
      this.root = 'seajs/';
      this.defaultResourceList = [{
        name: 'Underscore',
        value: 'includeUnderscore',
        checked: true
      }, {
        name: 'HandlerBar',
        value: 'includeHandlerBar',
        checked: true
      }];
    },

    /**
     * @method buildApp
     * @desc 生成seajs的基础目录
     */
    buildApp: function() {
      if(!this.ins) return;
      this.ins.mkdir('src');
      this.ins.mkdir('src/tpl');
      this.ins.mkdir('src/js');
      this.ins.mkdir('src/css');
      this.ins.mkdir('src/img');
      this.ins.mkdir('src/fonts');
      this.ins.mkdir('src/doc');
      this.ins.mkdir('src/html');
    },

    CLASS_NAME: 'SeaJsPrj'
  }),

  /**
   * @desc 单例
   */
  seajsPrj = module.exports = (!seajsPrj ? new SeaJsPrj() : seajsPrj);
