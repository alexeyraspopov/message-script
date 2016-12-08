class IdleCallbackExecutor {
  execute(routine) {
    return new Promise(resolve => {
      requestIdleCallback(() => resolve(routine()));
    });
  }
}

exports.IdleCallbackExecutor = IdleCallbackExecutor;
