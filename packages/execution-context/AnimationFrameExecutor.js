export default class AnimationFrameExecutor {
  execute(routine) {
    return new Promise(resolve => {
      requestAnimationFrame(() => resolve(routine()));
    });
  }
}
