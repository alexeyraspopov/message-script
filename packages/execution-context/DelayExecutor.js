export default class DelayExecutor {
  constructor(delay) {
    this.delay = delay;
  }

  execute(routine) {
    return new Promise(resolve => {
      setTimeout(() => resolve(routine()), this.delay);
    });
  }
}
