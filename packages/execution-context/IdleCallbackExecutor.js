/**
 * Schedules a routine execution using `requestIdleCallback`
 * https://developer.mozilla.org/en-US/docs/Web/API/window/requestIdleCallback
 */
export default class IdleCallbackExecutor {
  execute(routine) {
    return new Promise(resolve => {
      requestIdleCallback(() => resolve(routine()));
    });
  }
}
