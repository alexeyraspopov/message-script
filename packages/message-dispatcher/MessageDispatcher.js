export default class MessageDispatcher {
  constructor(mailboxes) {
    this.mailboxes = mailboxes;
  }

  dispatch(envelope) {
    for (const mailbox of this.mailboxes) {
      mailbox.enqueue(envelope);
    }
  }
}
