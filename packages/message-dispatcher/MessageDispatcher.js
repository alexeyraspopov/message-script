export default class MessageDispatcher {
  constructor() {
    this.mailboxes = new Map();
  }

  /**
   * Creates a singleton mailbox based on its constructor.
   * @param {Class} Mailbox — a particular mailbox class
   * @return {Mailbox} — an instance of provided mailbox class
   */
  mailboxOf(MailboxType) {
    if (this.mailboxes.has(MailboxType)) {
      return this.mailboxes.get(MailboxType);
    }

    const mailbox = new MailboxType();
    this.mailboxes.set(MailboxType, mailbox);

    return mailbox;
  }

  /**
   * Broadcasts an envelope across registered mailboxes
   * @param {Envelope} envelope — pair of message and sender
   */
  dispatch(envelope) {
    for (const mailbox of this.mailboxes.values()) {
      mailbox.enqueue(envelope);
    }
  }
}
