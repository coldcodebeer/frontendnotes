- the call stack
  - one thread == one call stack == one thing at a time
- what is the event loop
  - like the main function of the browser
  - an infinite loop
  - an event loop can have one and more task queues
    - queues can be excuted in any order
    - tasks in the same queue must be executed in the order they arrived
    - task from the same source must go in the same queue 

  ```javascript
  // browser
  while(true) {
    queue = getNextQueue()
    task = queue.pop()
    execute(task)

    while(microtaskQueue.hasTasks())
      doMicroTask()

    if (isRepaintTime()) {
      // animation frame callback queue
      animationTasks = animationQueue.copyTasks()
      for (task in animationTasks)
        doAnimationTask(task)

      repaint()
    }
  }

  // node.js
  // no script parsing events
  // no pesky user interactions
  // no animation frame callbacks
  // no rendering pipeline at all
  // first: one queue for all of event callbacks(XHR requests, disk IO, etc) 
  // sencond: check queue, setImmediate(callback)
  // setImmediate(): do something on the next tick
  // third: one queue(timer queue) for setTimeout, setInterval
  // microtask queue: Promise.then(callback), process.nextTick(callback); nextTick callback will run before promises
  // process.nextTick(): do something immediately
  while(tasksAreWaiting()) {
    queue = getNextQueue()

    while(queue.hasTasks()) {
      task = queue.pop()
      execute(task)

      while(nextTickQueue.hasTasks())
        doNextTickTask()

      while(promiseQueue.hasTasks())
        doPromiseTask()
    }
  }

  // web workers
  // each webworker runs in its own thread
  // no script tags
  // no user interactions
  // no dom manipulation
  ```


- The event loop guarantees your task will complete before rendering next happens. 
- The event loop ensures that tasks appear in the right order
- Macro task(setTimeout, setInterval, requestAnimationFrame etc) will be executed on the next event loop.
- setTimeout: run one task in each event loop tick then not block rendering

  ```javascript
  function loop() {
    setTimeout(loop)
    // 4.7 millisecond
  }
  loop()
  ```

- task queues: take one and only one item on every turn of event loop

- requestAnimationFrame comes before processing CSS and before painting
  ```javascript
  button.addEventListener('click', () => {
    box.style.transform = 'translateX(1000px)'
    box.style.transition = 'transform 1s ease-in-out'

    // not working
    requestAnimationFrame(() => {
      box.style.transform = 'translateX(500px)'
    })
  })

  button.addEventListener('click', () => {
    box.style.transform = 'translateX(1000px)'
    box.style.transition = 'transform 1s ease-in-out'

    // worked
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        box.style.transform = 'translateX(500px)'
      })
    })
  })
  ```

- animation callbacks: they happen until completion;Except ones that were queued while we were processing animation callbacks.They were deferred to the next frame

- Micro tasks run after every task.
- Micro tasks behave quite differently depending on the JavaScript stack.
- Micro tasks will run if the JavaScript Stack is empty. 

  ```javascript
  button.addEventListener('click', () => {
    Promise.resolve().then(() => console.log('Microtask 1'))
    console.log('Listener 1')
  })
  button.addEventListener('click', () => {
    Promise.resolve().then(() => console.log('Microtask 2'))
    console.log('Listener 2')
  })
  ```

  <details>
    <summary>what are the logs?</summary>
    <p>ans: Listener 1 -> Microtask 1 -> Listener 2 -> Microtask 2</p>
    <h3>what if we trigger the event by <code>button.click()</code></h3>
    <p>ans: Listener 1 -> Listener 2 -> Microtask 1 -> Microtask 2</p>
    <p>because JavaScript Stack is not empty; after <code>Listener 1</code>, we queue the microtask and continue to <code>Listener 2</code></p>
  </details>

- Micro tasks(aka job, API: Promise callback, MutationObserver etc) will be called back before the start of the next event loop.
- Micro tasks also can block rendering.
  - async: it means that happens after synchronously executing code;
    - But being async doesn't mean it must yield to rendering
    - doesn't mean it must yield to any particular part of the event loop

  ```javascript
  fucntion loop() {
    Promise.resolve().then(loop())
  }
  loop()
  ```

- micro tasks: they are processed to completion including any additionally queued items
  - the event loop cannot continue until that queue has completely emptied and that is why it blocks rendering

#### tips
- long running tasks will make your web page run like a wonky cat
- Promises and nextTick tasks will make your web page run like a dead cat 
- Make sure break your tasks up into small pieces and don't have infinitely recursive promises and nextTick tasks

#### references
- [Jake Archibald: In The Loop - JSConf.Asia](https://www.youtube.com/watch?v=cCOL7MC4Pl0&ab_channel=JSConf)
- [Further Adventures of the Event Loop - Erin Zimmer - JSConf EU 2018](https://www.youtube.com/watch?v=u1kqx6AenYw)
- [What the heck is the event loop anyway? | Philip Roberts | JSConf EU](https://www.youtube.com/watch?v=8aGhZQkoFbQ)