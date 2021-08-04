const tick = Date.now()
const log = (label, val) => {
  console.log(`${label} \n Elapsed: ${Date.now() - tick}`)
  console.log('val=>', val)
}

const asyncOperation = function (time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (time === 2000) {
        // resolve(new Error('error at 2000'))
        reject('reject error at 2000')
        // throw new Error('throw error at 2000') 
      }
      resolve({
        time,
        endTime: +new Date,
      })
    }, time)
  })
}

// implement all
// If any one of the promise is rejected we should reject immediately.
// https://medium.com/@copperwall/implementing-promise-all-575a07db509a
// https://www.youtube.com/watch?v=vn3tm0quoqE&ab_channel=Fireship
function promiseAllRecursive(values) {
  if (values.length === 0) return Promise.resolve([])

  const [first, ...rest] = values
  return Promise.resolve(first).then(firstResult => {
    return promiseAllRecursive(rest).then(restResults => {
      return [firstResult, ...restResults]
    })
  })
}

function promiseAllIterative(values) {
  return new Promise((resolve, reject) => {
    const results = []
    let completed = 0

    values.forEach((value, index) => {
      Promise.resolve(value).then(result => {
        results[index] = result
        completed += 1

        if (completed == values.length) {
          resolve(results)
        }
      }).catch(err => reject(err))
    })
  })
}

function promiseAllReduce(values) {
  return values.reduce((accumulator, value) => {
    return accumulator.then(results => {
      return Promise.resolve(value).then(result => {
        return [...results, result]
      })
    })
  }, Promise.resolve([]))
}

(async () => {
  const results = await promiseAllRecursive(
    [
      asyncOperation(1000),
      asyncOperation(1000),
      asyncOperation(3000),
    ])
  log('promise_all', results)
})()

// implement allSettled
function allSettled(promises) {
  if (promises.length === 0) return Promise.resolve([])

  return new Promise((resolve, reject) => {
    const results = []
    let completed = 0

    promises.forEach((v, i) => {
      Promise.resolve(v).then(value => {
        results[i] = {
          status: 'fulfilled',
          value,
        }
      }).catch(reason => {
        results[i] = {
          status: 'rejected',
          reason,
        }
      }).finally(() => {
        completed++
        if (completed === promises.length) {
          resolve(results)
        }
      })
    })
  })
}
function allSettledV1(promises) {
  return new Promise(resolve => {
    const result = []

    // allSettled([]) should resolve right away
    if (!promises.length) return resolve([])

    const cb = async (promise, i) => {
      try {
        const value = await promise
        result[i] = { status: 'fulfilled', value }
      } catch (e) {
        result[i] = { status: 'rejected', reason: e }
      }

      if (result.length === promises.length) {
        return resolve(result)
      }
    }

    promises.forEach(cb)
  })
}





// bad, not operate concurrently
// This waits for the result of the first fetch
// before starting the second fetch.
async function doSomeThingsBad() {
  const result1 = await asyncOperation(1000)
  const result2 = await asyncOperation(1500)

  return {
    ...result1,
    ...result2,
  }
}

// good, request concurrently
// Both fetches are initiated concurrently, but the function waits for
// both to complete before continuing.
async function doSomeThingsGood() {
  // Because we don't await the fetch,
  // we get the promise, not the resolved value.
  const resultPromise1 = asyncOperation(1500)
  const resultPromise2 = asyncOperation(1500)

  // We can await the resulting promise from the
  // two fetches before continuing.
  try {
    return Promise.all([resultPromise1, resultPromise2])
  } catch (e) {
    // If either request fails, we can catch the error.
    console.log('There was an error', e.message)
  }
}

(async () => {
  doSomeThingsGood().then(values => {
    const [first, second] = values
    log('concurrently_results', {
      first,
      second,
    })
  })
})()




// loop
const getFruit = async name => {
  const fruits = {
    pineapple: '🍍',
    peach: '🍑',
    strawberry: '🍓',
    lemon: '🍋',
    grapes: '🍇',
    cherries: '🍒',
  }

  return fruits[name]
}

const fruitLoop1 = ['pineapple', 'peach', 'strawberry'].map(async (f, i) => {
  const emoji = await getFruit(f)
  log(`fruitLoop_not_recommend_${i}`, emoji)
})

const fruitLoop = async () => {
  for (const f of ['lemon', 'grapes', 'cherries']) {
    const emoji = await getFruit(f)
    log(`fruitLoop_recommend_`, emoji)
  }
}

fruitLoop()