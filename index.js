const { Dispatcher } = require('./Dispatcher');
const { Actor } = require('./Actor');
const { ReduceStore } = require('./ReduceStore');

const dispatcher = new Dispatcher();

function schedule() {
  dispatcher.dispatch(1);
  dispatcher.dispatch(2);
  dispatcher.dispatch(3);
  dispatcher.dispatch(4);
  dispatcher.dispatch(5);
  dispatcher.dispatch(6);
}

class ActorA extends Actor {
  receive(message) {
    console.log('actorA', message);
  }
}

class ActorB extends Actor {
  receive(message) {
    if (message ** 2 > 4) return this.terminate();
    console.log('actorB', message ** 2);
  }
}

class ActorC extends Actor {
  constructor(dispatcher, store) {
    super(dispatcher);
    this.store = store;
  }

  receive(message) {
    console.log('actorC', -message);
    console.log('actorC <- SumStore', this.store.getState());
  }
}

class SumStore extends ReduceStore {
  getInitialState() {
    return 0;
  }

  reduce(sum, action) {
    return sum + action;
  }
}

const store = new SumStore(dispatcher);
new ActorA(dispatcher);
new ActorB(dispatcher);
new ActorC(dispatcher, store);
schedule();
