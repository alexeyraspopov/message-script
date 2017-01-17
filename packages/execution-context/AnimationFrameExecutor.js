/**
 * Schedules a routine execution using `requestAnimationFrame`
 * https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 */
export default class AnimationFrameExecutor {
  constructor(targetFPS = 60) {
    this.maxDeadline = Math.floor(1000 / targetFPS);
  }

  execute(queue) {
    return new Promise(resolveQueue => {
      const deadline = new Deadline(this.maxDeadline);
      requestAnimationFrame(() => {
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

class Deadline {
  constructor(max) {
    this.max = max;
    this.start = performance.now();
  }

  timeRemaining() {
    return Math.max(0, this.max - (performance.now() - this.start));
  }
}
