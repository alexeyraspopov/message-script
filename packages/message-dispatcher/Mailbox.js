import { ExecutionContext, ImmediateExecutor } from 'execution-context';

export default class Mailbox {
  constructor(context) {
    this.context = context || new ExecutionContext(new ImmediateExecutor());
    this.receivers = new Set();
  }

  enqueue(envelope) {
    for (const receiver of this.receivers) {
      this.context.execute(receiver.bind(null, envelope));
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
