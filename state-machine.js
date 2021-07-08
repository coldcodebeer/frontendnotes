function createMachine(stateMachineDefinition) {
  const machine = {
    value: stateMachineDefinition.initialState,
    transition(currentState, event) {
      const currentStateDefinition = stateMachineDefinition[currentState]
      const destinationTransition = currentStateDefinition.transitions[event]
      if (!destinationTransition) return
      const destinationState = destinationTransition.target
      const destinationStateDefinition = stateMachineDefinition[destinationState]
      destinationTransition.action()
      currentStateDefinition.actions.onExit()
      destinationStateDefinition.actions.onEnter()
      machine.value = destinationState
      return machine.value
    },
  }
  return machine
}
const machine = createMachine({
  initialState: 'off',
  off: {
    actions: {
      onEnter() {
        console.log('off: onEnter')
      },
      onExit() {
        console.log('off: onExit')
      },
    },
    transitions: {
      switch: {
        target: 'on',
        action() {
          console.log('transition action for "switch" in "off" state')
        },
      },
    },
  },
  on: {
    actions: {
      onEnter() {
        console.log('on: onEnter')
      },
      onExit() {
        console.log('on: onExit')
      },
    },
    transitions: {
      switch: {
        target: 'off',
        action() {
          console.log('transition action for "switch" in "on" state')
        },
      },
    },
  },
})
let state = machine.value
console.log(`current state: ${state}`)
state = machine.transition(state, 'switch')
console.log(`current state: ${state}`)
state = machine.transition(state, 'switch')
console.log(`current state: ${state}`)


/** An abstract state machine
 * One state is defined as the initial state. 
 * When a machine starts to execute, it automatically enters this state.
 * 
 * Each state can define actions that occur when a machine enters or exits that state. 
 * Actions will typically have side effects.
 * 
 * Each state can define events that trigger a transition.
 * 
 * A transition defines how a machine would react to the event,
 * by exiting one state and entering another state.
 * 
 * A transition can define actions that occur when the transition happens.
 * Actions will typically have side effects.
 * 
 * The event is checked against the current state’s transitions.
 * 
 * If a transition matches the event, that transition “happens”.
 * 
 * By virtue of a transition “happening”, states are exited,
 * and entered and the relevant actions are performed
 * 
 * The machine immediately is in the new state, ready to process the next event
 * 
 */