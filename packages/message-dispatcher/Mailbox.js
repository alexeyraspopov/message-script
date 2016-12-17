export default class Mailbox {
  constructor() {
    this.inbox = [];
  }

  enqueue(receiver, envelope) {
    this.inbox.push({ receiver, envelope });
  }

  dequeue() {
    return this.inbox.shift();
  }
}
