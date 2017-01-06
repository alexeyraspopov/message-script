class ActorSystem {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
    this.actors = new Map();
  }

  // TODO: actor system should know less about mailboxes
  spawn(Constructor, name, mailboxType = Mailbox) {
    if (this.actors.has(name)) {
      return this.actors.get(name);
    }

    const actor = new Constructor(this);
    const mailbox = this.dispatcher.mailboxOf(mailboxType);

    // TODO: find better place for this routine
    // TODO: need sender
    mailbox.register(message => actor.receive(message));
    this.actors.set(name, actor);
  }

  dispatch(message, sender) {
    this.dispatcher.dispatch(message);
  }
}

class Actor {
  constructor(system) {
    this.system = system;
  }

  receive() {
    throw new Error('Actor::receive should be implemented by child class');
  }
}
