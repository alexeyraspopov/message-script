class ImmediateExecutor {
  execute(routine) {
    return new Promise(resolve => resolve(routine()));
  }
}

exports.ImmediateExecutor = ImmediateExecutor;
