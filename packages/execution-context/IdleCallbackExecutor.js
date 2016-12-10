export default class IdleCallbackExecutor {
  execute(routine) {
    return new Promise(resolve => {
      requestIdleCallback(() => resolve(routine()));
    });
  }
}
