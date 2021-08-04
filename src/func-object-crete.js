// implement Object.create function
function create(proto) {
  function F() { }
  F.prototype = proto
  F.prototype.constructor = F
  return new F()
}

// implement new keyword
function newKeyWordFunc(fn) {
  const instance = Object.create(fn.prototype)
  const args = [...arguments].slice(1)
  const res = fn.apply(instance, args)
  return typeof res === 'object' ? res : instance
}

// instanceof
function myInstanceof(left, right) {
  const proto = Object.getPrototypeOf(left)
  while (true) {
    if (proto === null) return false
    if (proto === right.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}