export default class Actor {
  constructor(system, mailbox) {
    this.system = system;
    this.subscription = mailbox.register(({ message, sender }) => {
      this.receive(message, sender);
    });
  }

  receive() {
    throw new Error('Not implemented');
  }

  dispose() {
    this.subscription.dispose();
  }
}
