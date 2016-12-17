export default class Actor {
  constructor(system) {
    this.system = system;
    this.dispatcher = system.dispatcher;
  }

  receive() {
    throw new Error('Not implemented');
  }
}
