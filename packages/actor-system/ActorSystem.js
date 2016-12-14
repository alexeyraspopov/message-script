import { MessageDispatcher } from 'message-dispatcher';
import ActorRef from './ActorRef';

export default class ActorSystem {
  constructor() {
    this.actors = new Map();
    this.dispatcher = new MessageDispatcher();
  }

  getStats() {
    const entries = this.actors.entries();
    const serialize = ([name, actor]) => ({
      name,
      type: actor.constructor.name,
      actor
    });

    return Array.from(entries, serialize);
  }

  actorOf(ActorConstructor, name) {
    if (this.actors.has(name)) {
      return this.actors.get(name);
    }

    const actor = new ActorConstructor();
    const ref = new ActorRef(actor);

    this.actors.set(name, ref);

    return actor;
  }
}
