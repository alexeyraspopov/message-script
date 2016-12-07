class ExecutionContext {
  constructor(executor) {
    this.executor = executor;
    this.current = Promise.resolve();
  }

  async execute(routine) {
    try {
      await this.current;
      this.current = this.executor.execute(routine);
    } finally {
      return this.current;
    }
  }
}

exports.ExecutionContext = ExecutionContext;
