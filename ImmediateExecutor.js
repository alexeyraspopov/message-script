class ImmediateExecutor {
  async execute(routine) {
    return routine();
  }
}

exports.ImmediateExecutor = ImmediateExecutor;
