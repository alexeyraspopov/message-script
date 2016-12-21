/**
 * Executes arbitrary code asynchronously and concurrently.
 * @example
 *     const executor = new ImmediateExecutor()
 *     const context = new ExecutionContext(executor);
 *     const result = context.execute(() => 'Hello, World!');
 *     result.then(message => console.log(message));
 */
export default class ExecutionContext {
  /**
   * @param {Executor} executor — an instance that handles code running
   * @param {Number} concurrent — number of routines that can be executed at once
   * @param {Boolean} manual — set to `true` if manual queue execution needed
   */
  constructor(executor, concurrent = 1, manual = false) {
    this.executor = executor;
    this.concurrent = concurrent;
    this.manual = manual;
    this.queue = [];
    this.current = Promise.resolve();
  }

  /**
   * @param {Function} routine — arbitrary code to execute
   * @return {Promise} — async result of executed routine
   */
  execute(routine) {
    return new Promise((resolve, reject) => {
      this.queue.push({ routine, resolve, reject });

      if (!this.manual && this.queue.length === 1) {
        this.flush();
      }
    });
  }

  /**
   * @return {Promise} — return a promise that is fulfilled when queue is empty
   */
  flush() {
    return this.current.then(() => {
      const tasks = this.queue.splice(0, this.concurrent);

      if (tasks.length > 0) {
        this.current = this.executor.execute(batchTasks(tasks));
        return this.queue.length === 0 || this.flush();
      }

      return false;
    });
  }
}

function batchTasks(tasks) {
  return function batch() {
    for (var task of tasks) {
      try {
        task.resolve(task.routine());
      } catch (error) {
        task.reject(error);
      }
    }
  };
}
