class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    this.items.push(item);
  }

  [Symbol.asyncIterator]() {
    return new AsyncQueueIterator(this.items);
  }

  [Symbol.iterator]() {
    return new QueueIterator(this.items);
  }
}

class QueueIterator {
  constructor(queue) {
    this.queue = queue;
  }

  next() {
    const done = this.queue.length === 0;
    const value = this.queue.shift();

    return { value, done };
  }

  [Symbol.iterator]() {
    return this;
  }
}

class AsyncQueueIterator extends QueueIterator {
  async next() {
    // FIXME: https://github.com/babel/babel/issues/3930
    return QueueIterator.prototype.next.call(this);
  }
}

exports.Queue = Queue;
