// implement Array.prototype.find function
Array.prototype.myFind = function (cb, thisArg) {
  if (typeof cb !== 'function') {
    throw new TypeError('callback should be a function')
  }

  if (!Array.isArray(this)) {
    throw new TypeError(`${this} should be array`)
  }

  const arr = this
  const len = arr.length
  let i = 0

  while (i < len) {
    if (cb.call(thisArg, arr[i], i, arr)) {
      return arr[i]
    }
    i++
  }
}
