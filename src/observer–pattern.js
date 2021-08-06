class Subject {
  #observers = []

  subscribe(observer) {
    this.#observers.push(observer)
  }

  unsubscribe(observer) {
    const index = this.#observers.indexOf(observer)

    if (index > -1) this.#observers.splice(index, 1)
  }

  notify(observer) {
    const index = this.#observers.indexOf(observer)
    if (index > -1) this.#observers[index].notify()
  }

  notifyAll() {
    for (let i = 0; i < this.#observers.length; i++) {
      this.#observers[i].notify()
    }
  }
}

class Observer {
  #number
  constructor(number) {
    this.#number = number
  }
  notify() {
    console.log(`Observer ${this.#number} is notified!`)
  }
}

const subject = new Subject

const observer1 = new Observer(1)
const observer2 = new Observer(2)
const observer3 = new Observer(3)
const observer4 = new Observer(4)

subject.subscribe(observer1)
subject.subscribe(observer2)
subject.subscribe(observer3)
subject.subscribe(observer4)

subject.notify(observer2)
subject.unsubscribe(observer2)

subject.notifyAll()