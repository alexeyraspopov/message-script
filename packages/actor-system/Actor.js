export default class Actor {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  receive() {
    throw new Error('Not implemented');
  }
}
