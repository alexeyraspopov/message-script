export default class Mailboxes {
  constructor() {
    this.mailboxes = [];
  }

  register(mailbox) {
    this.mailboxes.push(mailbox);
  }

  [Symbol.iterator]() {
    return this.mailboxes[Symbol.iterator]();
  }
}
