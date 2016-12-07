class ExecutionContext {
  constructor(executor) {
    this.executor = executor;
    this.queue = [];
    this.isExecuting = false;
  }

  run(routine) {
    return new Promise(async (resolve, reject) => {
      this.queue.push({ resolve, reject, routine });

      if (!this.isExecuting) {
        this.isExecuting = true;
        await Promise.resolve();
        await this.dequeue();
        this.isExecuting = false;
      }
    });
  }

  async dequeue() {
    while (this.queue.length > 0) {
      const task = this.queue.shift();

      try {
        const result = await this.executor.execute(task.routine);
        task.resolve(result);
      } catch (error) {
        task.reject(error);
      }
    }
  }
}

exports.ExecutionContext = ExecutionContext;
