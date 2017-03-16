import { Envelope } from 'message-dispatcher';

export default class ActorRef {
  constructor(actor) {
    this.source = actor;
  }

  tell(message, sender) {
    const envelope = new Envelope(message, sender);
    this.source.mailbox.enqueue(envelope);
  }
}
