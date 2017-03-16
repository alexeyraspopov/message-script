import { MessageDispatcher, Envelope } from 'message-dispatcher';
import ActorRef from './ActorRef';

export default class ActorSystem {
  constructor(dispatcher) {
    this.actors = new Map();
    this.dispatcher = dispatcher;
  }

  actorOf(ActorType, name = ActorType.name.toLowerCase()) {
    if (this.actors.has(name)) {
      return this.actors.get(name);
    }

    const actor = new ActorType(this);
    const ref = new ActorRef(actor);

    const mailbox = this.dispatcher.mailboxOf(ActorType.getMailboxType());

    mailbox.register(({ message, sender }) => {
      actor.receive(message, sender);
    });

    this.actors.set(name, ref);

    return actor;
  }

  dispatch(message, sender) {
    const envelope = new Envelope(message, sender);
    this.dispatcher.dispatch(envelope);
  }
}
