class ExecutionContext {
  constructor(executor) {
    this.executor = executor;
    this.queue = [];
    this.isExecuting = false;
  }

  run(routine) {
    if (!this.isExecuting) {
      this.isExecuting = true;
      Promise.resolve()
        .then(() => this.dequeue())
        .then(() => {
          this.isExecuting = false;
        });
    }

    return new Promise(resolve => {
      this.queue.push({ resolve, routine });
    });
  }

  dequeue() {
    const task = this.queue.shift();

    return this.executor.execute(task.routine)
      .then(task.resolve)
      .then(() => this.queue.length && this.dequeue());
  }
}

exports.ExecutionContext = ExecutionContext;
