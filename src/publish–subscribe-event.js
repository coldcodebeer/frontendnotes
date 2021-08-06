class Event {
  #listeners = {}
  /**
   * @param {String} eventType
   * @param {Function} listener
   */
  on(eventType, listener) {
    if (!this.#listeners[eventType]) this.#listeners[eventType] = []
    this.#listeners[eventType].push(listener)
    console.log(this.#listeners[eventType].length)
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
}

const myEvent = new Event
myEvent.on('open', (data) => {
  console.log(data)
})
myEvent.emit('open', { open: true })