const { Queue } = require('./Queue');

class Dispatcher {
  constructor() {
    this.mailbox = new Queue();
    this.queue = new Queue();
    this.isDispatching = false;
  }

  async dispatch(message) {
    this.mailbox.enqueue(message);

    if (!this.isDispatching) {
      this.isDispatching = true;

      for await (const message of this.mailbox) {
        for (const task of this.queue) task(message);
      }

      this.isDispatching = false;
    }
  }

  [Symbol.asyncIterator]() {
    return new DispatcherIterator(this);
  }
}

class DispatcherIterator {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  next() {
    return new Promise(resolve => {
      const task = (value) => resolve({ value, done: false });
      this.dispatcher.queue.enqueue(task);
    });
  }
}

exports.Dispatcher = Dispatcher;
