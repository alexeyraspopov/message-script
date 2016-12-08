class AnimationFrameExecutor {
  execute(routine) {
    return new Promise(resolve => {
      requestAnimationFrame(() => resolve(routine()));
    });
  }
}

exports.AnimationFrameExecutor = AnimationFrameExecutor;
