const { Actor } = require('./Actor');

class ReduceStore extends Actor {
  constructor(dispatcher) {
    super(dispatcher);
    this.state = this.getInitialState();
  }

  getState() {
    return this.state;
  }

  getInitialState() {
    return null;
  }

  reduce(state) {
    return state;
  }

  receive(message) {
    this.state = this.reduce(this.state, message);
  }
}

exports.ReduceStore = ReduceStore;
