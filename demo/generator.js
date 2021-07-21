function* generatorFunction() {
  console.log('This will be executed first.')
  yield 'Hello, '
  console.log('I will be printed after the pause')
  yield 'World!'
}

const generatorObject = generatorFunction()
console.log(generatorObject.next().value)
console.log(generatorObject.next().value)
console.log(generatorObject.next().value)

// a generator is a function that can stop midway and then continue from where it stopped.
// Generators are a special class of functions that simplify the task of writing iterators.
// A generator is a function that produces a sequence of results instead of a single value, i.e you generate ​a series of values.

// yield
// It’s an operator with which a generator can pause itself.
// Every time a generator encounters a yield, it “returns” the value specified after it.
// We can also return from a generator. However, return sets the done property to true after which the generator cannot generate any more values.


// use case
// bad
const iterableObj = {
  [Symbol.iterator]() {
    let step = 0;
    return {
      next() {
        step++;
        if (step === 1) {
          return { value: 'This', done: false };
        } else if (step === 2) {
          return { value: 'is', done: false };
        } else if (step === 3) {
          return { value: 'iterable.', done: false };
        }
        return { value: '', done: true };
      }
    }
  },
}
for (const val of iterableObj) {
  console.log(val);
}

// good
function* iterableObjFunc() {
  yield 'This';
  yield 'is';
  yield 'iterable.'
}
for (const val of iterableObjFunc()) {
  console.log(val);
}