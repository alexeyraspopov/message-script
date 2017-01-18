/**
 * Schedules a routine execution using `requestIdleCallback`
 * https://developer.mozilla.org/en-US/docs/Web/API/window/requestIdleCallback
 */
export default class IdleCallbackExecutor {
  /**
   * @param {Number} timeout — maximum wait time before execution
   */
  constructor(timeout) {
    this.timeout = parseInt(timeout) || 1000;
  }

  /**
   * @param {Array} queue — an array of routines to execute
   */
  execute(queue) {
    return new Promise(resolveQueue => {
      requestIdleCallback(deadline => {
        while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && queue.length > 0) {
          const task = queue.shift();
          task.run();
        }

        if (queue.length > 0) {
          return resolveQueue(this.execute(queue));
        }

        resolveQueue();
      }, { timeout: this.timeout });
    });
  }
}
