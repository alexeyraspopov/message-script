/**
 * Schedules a routine execution using `setTimeout`
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout
 */
export default class DelayExecutor {
  /**
   * @param {Number} delay — a timeout before next execution
   */
  constructor(delay) {
    this.delay = parseInt(delay) || 0;
  }

  execute(routine) {
    return new Promise(resolve => {
      setTimeout(() => resolve(routine()), this.delay);
    });
  }
}
