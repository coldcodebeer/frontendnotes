class Event {
  #listeners = {}
  /**
   * @param {String} eventType
   * @param {Function} listener
   */
  on(eventType, listener) {
    if (!this.#listeners[eventType]) this.#listeners[eventType] = []
    this.#listeners[eventType].push(listener)
  }

  /**
   * @param {String} eventType
   * @param {Any} data
   */
  emit(eventType, data) {
    const callbacks = this.#listeners[eventType]

    if (callbacks) {
      callbacks.forEach(cb => {
        cb(data)
      })
    }
  }

  off(eventType, cb) {
    const callbacks = this.#listeners[eventType]
    if (!callbacks) return

    if (!cb) callbacks.length = 0
    else {
      callbacks.forEach((v, i) => {
        if (cb === v) callbacks.splice(i, 1)
      })
    }
  }
}

const myEvent = new Event
myEvent.on('open', (data) => {
  console.log(data)
})
const cb = () => console.log('remove one listener')
myEvent.on('open', cb)
myEvent.emit('open', { open: true })

myEvent.off('open', cb)
myEvent.emit('open', { open: true })

myEvent.off('open')
myEvent.emit('open', { open: true })