/**
 * Schedules a routine execution using `process.nextTick`
 * https://nodejs.org/api/process.html#process_process_nexttick_callback_args
 */
export default class NextTickExecutor {
  execute(queue) {
    return new Promise(resolveQueue => {
      process.nextTick(() => {
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
