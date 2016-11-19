class Actor {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
    this.isTerminated = false;
    this.listen();
  }

  async listen() {
    for await (const message of this.dispatcher) {
      if (this.isTerminated) break;
      this.receive(message);
    }
  }

  terminate() {
    // should this mechanism be covered by different instance?
    this.isTerminated = true;
  }

  receive() {
    throw new Error('Not implemented');
  }
}

exports.Actor = Actor;
