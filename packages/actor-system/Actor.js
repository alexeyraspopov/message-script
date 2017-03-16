import { Mailbox } from 'message-dispatcher';

export default class Actor {
  static getMailboxType() {
    return Mailbox;
  }

  constructor(system) {
    this.system = system;
  }

  receive() {
    throw new Error('Actor::receive should be implemented by a child class');
  }

  dispose() {
    this.subscription.dispose();
  }
}
