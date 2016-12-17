export default class DebounceExecutor {
  constructor(delay) {
    this.delay = parseInt(delay) || 0;
    this.timer = null;
  }

  execute(routine) {
    return new Promise(resolve => {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => resolve(routine()), this.delay);
    });
  }
}
