export default class ExecutionContext {
  constructor(executor, concurrent = 1, manual = false) {
    this.executor = executor;
    this.concurrent = concurrent;
    this.manual = manual;
    this.queue = [];
    this.current = Promise.resolve();
  }

  execute(routine) {
    return new Promise((resolve, reject) => {
      this.queue.push({ routine, resolve, reject });

      if (!this.manual && this.queue.length === 1) {
        this.flush();
      }
    });
  }

  async flush() {
    await this.current;
    const tasks = this.queue.splice(0, this.concurrent);

    if (tasks.length > 0) {
      this.current = this.executor.execute(batchTasks(tasks));
      return this.queue.length === 0 || this.flush();
    }

    return false;
  }
}

function batchTasks(tasks) {
  return function batch() {
    tasks.forEach(task => {
      try {
        task.resolve(task.routine());
      } catch (error) {
        task.reject(error);
      }
    });
  };
}
