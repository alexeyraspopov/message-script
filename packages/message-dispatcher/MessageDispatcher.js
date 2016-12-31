export default class MessageDispatcher {
  constructor() {
    this.mailboxes = new Map();
  }

  mailboxOf(MailboxType) {
    if (this.mailboxes.has(MailboxType)) {
      return this.mailboxes.get(MailboxType);
    }

    const mailbox = new MailboxType();
    this.mailboxes.set(MailboxType, mailbox);

    return mailbox;
  }

  dispatch(envelope) {
    for (const mailbox of this.mailboxes.values()) {
      mailbox.enqueue(envelope);
    }
  }
}
