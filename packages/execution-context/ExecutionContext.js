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
   */
  constructor(executor) {
    this.executor = executor;
    this.queue = [];
    this.current = Promise.resolve();
  }

  /**
   * @param {Function} routine — arbitrary code to execute
   * @return {Promise} — async result of executed routine
   */
  execute(routine) {
    return new Promise((resolve, reject) => {
      this.queue.push(new Task(routine, resolve, reject));

      if (this.queue.length === 1) this.flush();
    });
  }

  /**
   * @return {Promise} — return a promise that is fulfilled when queue is empty
   */
  flush() {
    return this.current.then(() => {
      this.current = this.executor.execute(this.queue);
      this.queue = [];
    });
  }
}

class Task {
  constructor(routine, resolve, reject) {
    this.routine = routine;
    this.resolve = resolve;
    this.reject = reject;
  }

  run() {
    try {
      this.resolve(this.routine());
    } catch (error) {
      this.reject(error);
    }
  }
}
