export default class Mailbox {
  constructor(context) {
    this.context = context;
    this.resolvers = new Set();
  }

  enqueue(envelope) {
    this.context.execute(() => {
      this.resolvers.forEach(resolve => resolve(envelope))
    });
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
