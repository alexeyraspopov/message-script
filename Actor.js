class Actor {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
    this.isDisabled = false;
    this.enable();
  }

  async enable() {
    this.isDisabled = false;

    for await (const message of this.dispatcher) {
      if (this.isDisabled) break;
      this.receive(message);
    }
  }

  disable() {
    // should this mechanism be covered by different instance?
    this.isDisabled = true;
  }

  receive() {
    throw new Error('Not implemented');
  }
}

exports.Actor = Actor;
