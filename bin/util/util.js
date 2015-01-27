'use strict';

var util = module.exports = {};

util.bind = function(func, object) {
  var args = Array.prototype.slice.apply(arguments, [2]);
  return function() {
    var newArgs = args.concat(
      Array.prototype.slice.apply(arguments, [0])
    );
    return func.apply(object, newArgs);
  };
};

/**
 * @method util.define
 * @desc 类生成.将返回一个形如——
 * function C() {
     *      this.initialize()
     * };
 * C.prototype = { constructor: C, ... }的对象
 * 支持两个参数，第一个为父类（可不存在），第二个为生成类的各属性方法对象 由于每个类的生成都基于子类对父类对象的深度拷贝，因此，
 * 为避免子类属性更改对父类造成的不可控影响，除Number|String|Boolean 外的对象 初始化都建议放在构造函数当中去做 初始化值建议
 * 为null
 * @example
 * var newClass = util.define({
     *     width: 64,
     *     length: "12px",
     *     property: null,
     *     initialize: function() {
     *         this.property = Object.create({});
     *     }
     * });
 * @return {Function}
 */
util.define = function() {
  var len = arguments.length,
    s = arguments[0],
    i = arguments[len - 1];

  var nc = typeof i.initialize == "function" ? i.initialize :
    function() {
      s.apply(this, arguments);
    };
  if(len > 1) {
    var newArgs = [nc, s].concat(Array.prototype.slice.call(arguments).slice(1, len - 1), i);
    util.inherit.apply(null, newArgs);
  } else {
    nc.prototype = i;
    nc.prototype.constructor = nc;
  }
  return nc;
};

/**
 * @method util.inherit
 * @desc 继承
 * @param child {Function} 子类
 * @param father {Function} 父类
 */
util.inherit = function(child, father) {
  var f = function() {},
    cp,
    fp = father.prototype;
  f.prototype = fp;
  cp = child.prototype = new f;
  cp.constructor = child;
  var i, l, k;
  for(i = 2, l = arguments.length; i < l; i++) {
    k = arguments[i];
    if(typeof k === "function") {
      k = k.prototype;
    }
    util.extend(child.prototype, k);
  }
};

/**
 * @method util.extend
 * @desc 将一个对象的属性复制给另一个对象
 * @param destination {object}
 * @param source {object}
 */
util.extend = function(destination, source) {
  destination = destination || {};
  if(source) {
    for(var property in source) {
      var value = source[property];
      if(value !== undefined) {
        destination[property] = value;
      }
    }
  }
  return destination;
};