class MessageDispatcher {
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

  dispatch(message) {
    for (const mailbox of this.mailboxes.values()) {
      mailbox.enqueue(message);
    }
  }
}

class Mailbox {
  constructor(context) {
    this.context = context || new ExecutionContext(new ImmediateExecutor());
    this.receivers = new Set();
  }

  enqueue(message) {
    for (const receiver of this.receivers) {
      this.context.execute(receiver.bind(null, message));
    }
  }

  register(receiver) {
    this.receivers.add(receiver);
    return new MailboxSubscription(this.receivers, receiver);
  }
}

class MailboxSubscription {
  constructor(receivers, receiver) {
    this.receivers = receivers;
    this.receiver = this.receiver;
  }

  dispose() {
    this.receivers.delete(this.receiver);
  }
}

class Message {
  constructor(data) {
    this.subject = this.constructor.name;
    this.content = data;
    Object.freeze(this);
    Object.freeze(this.content);
  }
}
