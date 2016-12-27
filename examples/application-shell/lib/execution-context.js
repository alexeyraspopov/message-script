class ExecutionContext {
  constructor(executor) {
    this.executor = executor;
    this.current = Promise.resolve();
  }

  execute(routine) {
    return this.current.then(() => this.executor.execute(routine));
  }
}

class ImmediateExecutor {
  execute(routine) {
    return new Promise((resolve, reject) => {
      try {
        resolve(routine());
      } catch (error) {
        reject(error);
      }
    });
  }
}
