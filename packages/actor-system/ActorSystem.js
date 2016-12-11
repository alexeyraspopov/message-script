const { MessageDispatcher } = require('message-dispatcher');

export default class ActorSystem {
  constructor() {
    this.actors = new Map();
    this.dispatcher = new MessageDispatcher();
  }

  getStats() {
    const entries = this.actors.entries();
    const serialize = ([name, actor]) => ({ name, actor });

    return Array.from(entries, serialize);
  }

  actorOf(ActorConstructor, name) {
    if (this.actors.has(name)) {
      return this.actors.get(name);
    }

    const actor = new ActorConstructor();

    this.actors.set(name, actor);

    return actor;
  }
}
