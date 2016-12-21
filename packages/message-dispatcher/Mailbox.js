export default class Mailbox {
  constructor() {
    this.inbox = [];
    this.resolvers = new Set();
  }

  enqueue(envelope) {
    this.inbox.push({ envelope });
  }

  dequeue() {
    return this.inbox.shift();
  }

  register(routine) {
    this.resolvers.add(routine);
    return new Subscription(this.resolvers, routine);
  }
}

class Subscription {
  constructor(resolvers, routine) {
    this.resolvers = resolvers;
    this.routine = routine;
  }

  dispose() {
    this.resolvers.delete(this.routine);
  }
}
