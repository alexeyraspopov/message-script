export default class DelayExecutor {
  constructor(delay) {
    this.delay = parseInt(delay) || 0;
  }

  execute(queue) {
    return new Promise(resolveQueue => {
      setTimeout(() => {
        const task = queue.shift();
        task.run();

        if (queue.length > 0) {
          return resolveQueue(Promise.resolve().then(() => this.execute(queue)));
        }

        resolveQueue();
      }, this.delay);
    });
  }
}
