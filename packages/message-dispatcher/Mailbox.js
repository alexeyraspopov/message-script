export default class Mailbox {
  constructor() {
    this.inbox = [];
  }

  enqueue(envelope) {
    this.inbox.push({ envelope });
  }

  dequeue() {
    return this.inbox.shift();
  }
}
