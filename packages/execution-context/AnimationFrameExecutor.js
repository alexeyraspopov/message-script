/**
 * Schedules a routine execution using `requestAnimationFrame`
 * https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 */
export default class AnimationFrameExecutor {
  execute(routine) {
    return new Promise(resolve => {
      requestAnimationFrame(() => resolve(routine()));
    });
  }
}
