export default class DelayExecutor {
  constructor(delay) {
    this.delay = parseInt(delay) || 0;
  }

  execute(routine) {
    return new Promise(resolve => {
      setTimeout(() => resolve(routine()), this.delay);
    });
  }
}
