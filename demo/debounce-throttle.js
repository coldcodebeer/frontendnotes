// 防抖
// 事件触发 n 秒后才执行
// 如果在一个事件触发的 n 秒内又触发了这个事件
// 以新的事件的时间为准，n 秒后才执行
// https://github.com/mqyqingfeng/Blog/issues/22
// immediate 参数判断是否是立刻执行
function debounce(callback, wait, immediate) {
  let timeout, result

  const debounced = function () {
    const context = this
    const args = arguments
    if (timeout) clearTimeout(timeout)

    if (immediate) {
      const canNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if (canNow) result = callback.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        callback.apply(context, args)
      }, wait)
    }

    return result
  }

  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}

// 节流
// 规定在一个单位时间内，只能触发一次函数。
// 如果这个单位时间内触发多次函数，只有一次生效
// https://juejin.cn/post/6844903669389885453
function throttle(cb, delay) {
  let last, timeout
  return function () {
    const self = this
    const _args = arguments
    const now = +new Date()
    if (last && now < last + delay) {
      clearTimeout(timeout)
      timeout = setTimeout(function () {
        last = now
        cb.apply(self, _args)
      }, delay)
    } else {
      last = now
      cb.apply(self, _args)
    }
  }
}
