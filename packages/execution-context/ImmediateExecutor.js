/**
 * Schedules a routine execution on the next event loop
 */
export default class ImmediateExecutor {
  /**
   * @param {Number} concurrent — a number of routines that should be executed in the same loop
   */
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
