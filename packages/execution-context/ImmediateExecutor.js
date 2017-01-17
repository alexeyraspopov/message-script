/**
 * Schedules a routine execution on the next event loop
 */
export default class ImmediateExecutor {
  execute(queue) {
    return new Promise(resolveQueue => {
      const task = queue.shift();
      task.run();

      if (queue.length > 0) {
        return resolveQueue(Promise.resolve().then(() => this.execute(queue)));
      }

      resolveQueue();
    });
  }
}
