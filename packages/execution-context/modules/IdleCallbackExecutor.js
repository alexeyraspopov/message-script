export default class IdleCallbackExecutor {
  constructor(timeout) {
    this.timeout = parseInt(timeout) || 1000;
  }

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
