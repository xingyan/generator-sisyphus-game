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
        name: 'FlashSDK',
        value: 'includeFlashSDK',
        checked: true
      }];
    },

    /**
     * @desc 初始化样式表相关
     * @returns {boolean}
     */
    mainStylesheet: function() {
      if(!this.ins) return;
      var css = 'main',
        suffix;
      if(this.includeSass) {
        suffix = 'scss';
      } else if(this.includeLess) {
        suffix = 'less'
      } else {
        suffix = 'css';
      }
      css += '.' + suffix;
      this.ins.copy(this.root + css, 'src/styles/' + suffix + '/' + css);
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
      this.ins.mkdir('src/styles');
      this.ins.mkdir('src/img');
      this.ins.mkdir('src/fonts');
      this.ins.mkdir('src/doc');
      this.ins.mkdir('src/html');
      this.ins.copy(this.root + 'index.js', 'src/js/index.js');
    },

    /**
     * @metdho writeIndex
     */
    writeIndex: function() {
      var result = BasePrj.prototype.writeIndex.apply(this, arguments);
      if(!result) return;
      this.ins.indexFile = this.ins.appendFiles({
        html: this.ins.indexFile,
        fileType: 'js',
        optimizedPath: 'js/index.js',
        sourceFileList: ['../js/index.js']
      });
      this.ins.indexFile = this.ins.append(this.ins.indexFile, 'body',
      '<script>seajs.use(["../js/module"])</script>');

      this.ins.write('src/html/index.html', this.ins.indexFile);
    },

    CLASS_NAME: 'SeaJsPrj'
  }),

  /**
   * @desc 单例
   */
  seajsPrj = module.exports = (!seajsPrj ? new SeaJsPrj() : seajsPrj);
