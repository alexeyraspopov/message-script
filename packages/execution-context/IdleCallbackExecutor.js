/**
 * Schedules a routine execution using `requestIdleCallback`
 * https://developer.mozilla.org/en-US/docs/Web/API/window/requestIdleCallback
 */
export default class IdleCallbackExecutor {
  execute(queue) {
    return new Promise(resolveQueue => {
      requestIdleCallback(deadline => {
        while (deadline.timeRemaining() > 0 && queue.length > 0) {
          const task = queue.shift();
          task.run();
        }

        if (queue.length > 0) {
          return resolveQueue(this.execute(queue));
        }

        resolveQueue();
      });
    });
  }
}
