/// <reference types="execution-context" />

declare module MessageDispatcher {
  export class MessageDispatcher {
    constructor();
    mailboxOf(mailboxType: typeof Mailbox): Mailbox;
    dispatch(envelope: Envelope): void;
  }

  export class Envelope {
    message: Message<any>;
    sender: any;
    constructor(message: Message<any>, sender: any);
  }

  export class Message<T> {
    subject: string;
    content: T;
    constructor(data: T);
  }

  export class Mailbox {
    constructor(context: ExecutionContext.ExecutionContext);
    enqueue(envelope: Envelope | Message<any>): void;
    register(receiver: Function): Subscription;
  }

  export class Subscription {
    dispose(): void;
  }
}
