import { ExecutionContext, ImmediateExecutor } from 'execution-context';

export default class MessageDispatcher {
  constructor(mailboxes, context) {
    if (!context) {
      const executor = new ImmediateExecutor();
      context = new ExecutionContext(executor);
    }

    this.mailboxes = mailboxes;
    this.context = context;
  }

  dispatch(envelope) {
    for (const mailbox of this.mailboxes) {
      mailbox.enqueue(envelope);
    }
  }
}
