// implement call function
Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw new Error(this + "it's not callable");
  }
  context = context || window
  if (typeof context !== 'object') context = Object(context)
  const fn = getSymbol(context)
  context[fn] = this
  const arg = [...arguments].slice(1)
  const result = context[fn](...arg)
  delete context[fn]
  return result
}

// implement apply function
Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    throw new Error(this + "it's not callable");
  }
  context = context || window
  if (typeof context !== 'object') context = Object(context)
  const fn = getSymbol(context)
  context[fn] = this
  const arg = [...arguments].slice(1)
  const result = context[fn](arg)
  delete context[fn]
  return result
}

// implement bind function(MDN Pollyfill of bind)
Function.prototype.bind = function (oThis) {
  if (typeof this !== 'function') {
    // closest thing possible to the ECMAScript 5
    // internal IsCallable function
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable')
  }

  var aArgs = Array.prototype.slice.call(arguments, 1),//这里的arguments是跟oThis一起传进来的实参
    fToBind = this,
    fNOP = function () { },
    fBound = function () {
      return fToBind.apply(this instanceof fNOP
        ? this
        : oThis,
        // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
        aArgs.concat(Array.prototype.slice.call(arguments)))
    }

  // 维护原型关系
  if (this.prototype) {
    // Function.prototype doesn't have a prototype property
    fNOP.prototype = this.prototype
  }

  fBound.prototype = new fNOP()

  return fBound
}

// helper function
function getSymbol(obj) {
  const uniqueKey = (Math.random() + new Date().getTime()).toString(32).slice(0, 8)
  if (obj.hasOwnProperty(uniqueKey)) return getSymbol(obj)
  return uniqueKey
}