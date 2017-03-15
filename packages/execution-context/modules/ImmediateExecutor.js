export default class ImmediateExecutor {
  constructor(concurrent) {
    this.concurrent = parseInt(concurrent) || 1;
  }

  execute(queue) {
    return new Promise(resolveQueue => {
      for (let i = 0; i < this.concurrent; i++) {
        const task = queue.shift();
        task.run();
      }

      if (queue.length > 0) {
        return resolveQueue(Promise.resolve().then(() => this.execute(queue)));
      }

      resolveQueue();
    });
  }
}
